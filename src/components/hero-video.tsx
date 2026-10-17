"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { trainer } from "@/data/trainer";

const mediaQuery = "(min-width: 1024px), (min-width: 768px) and (orientation: landscape)";
const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => {
  const screen = window.matchMedia(mediaQuery);
  const reduced = window.matchMedia(reducedQuery);
  screen.addEventListener("change", callback);
  reduced.addEventListener("change", callback);
  return () => { screen.removeEventListener("change", callback); reduced.removeEventListener("change", callback); };
};
const getSnapshot = () => {
  const desktop = window.matchMedia(mediaQuery).matches;
  const reduce = window.matchMedia(reducedQuery).matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return `${desktop ? "desktop" : "mobile"}-${reduce || saveData ? "static" : "motion"}`;
};

export function HeroVideo() {
  const preference = useSyncExternalStore(subscribe, getSnapshot, () => "ssr-static");
  const [manualPlay, setManualPlay] = useState(false);
  const [state, setState] = useState<"loading" | "playing" | "paused" | "blocked" | "error">("loading");
  const video = useRef<HTMLVideoElement>(null);
  const desktop = preference.startsWith("desktop");
  const allowed = preference !== "ssr-static" && (preference.endsWith("motion") || manualPlay);
  const hero = trainer.hero;
  const source = desktop ? hero.desktopVideo : hero.mobileVideo;
  useEffect(() => {
    if (!allowed || !video.current) return;
    const el = video.current;
    let active = true;
    void el.play().catch(() => { if (active) setState(el.error ? "error" : "blocked"); });
    const onVisibility = () => {
      if (document.hidden) el.pause();
      // Remain paused on return; the user can explicitly resume.
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { active = false; document.removeEventListener("visibilitychange", onVisibility); };
  }, [allowed, source]);
  async function toggle() {
    if (!allowed) { setManualPlay(true); return; }
    if (state === "error") { video.current?.load(); }
    if (video.current?.paused || state === "error" || state === "blocked") {
      try { await video.current?.play(); } catch { setState(video.current?.error ? "error" : "blocked"); }
    } else { video.current?.pause(); }
  }
  const playing = allowed && state === "playing";
  return <>
    <div className="hero-media" aria-hidden="true">
      <picture>
        <source media={mediaQuery} srcSet={`${hero.desktopPosterSmall} 960w, ${hero.desktopPoster} 1920w`} sizes="100vw"/>
        <source srcSet={`${hero.mobilePosterSmall} 480w, ${hero.mobilePoster} 900w`} sizes="100vw"/>
        {/* Native picture preserves responsive art direction without downloading both posters. */}
        <img src={hero.mobilePoster} alt="" fetchPriority="high" width="900" height="1600" className="hero-poster"/>
      </picture>
      {allowed && <video key={source} ref={video} className={`hero-video ${state === "playing" || state === "paused" ? "is-ready" : ""}`} src={source} autoPlay muted loop playsInline preload="none" disablePictureInPicture tabIndex={-1}
        onLoadStart={() => setState("loading")} onPlaying={() => setState("playing")} onPause={() => setState(video.current?.error ? "error" : video.current && video.current.readyState >= 2 ? "paused" : "blocked")} onError={() => setState("error")}/>} 
      <div className="hero-shade"/>
    </div>
    <button type="button" className="video-toggle" onClick={() => void toggle()} aria-label={playing ? "Pausar vídeo de fundo" : "Reproduzir vídeo de fundo"}>
      {playing ? <Pause size={13} fill="currentColor"/> : <Play size={13} fill="currentColor"/>}
      <span>{playing ? "Pausar vídeo" : state === "error" ? "Tentar vídeo novamente" : "Reproduzir vídeo"}</span>
    </button>
  </>;
}
