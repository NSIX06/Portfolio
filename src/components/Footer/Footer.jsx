import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { profile } from "../../data";
import PulseHeart from "../effects/PulseHeart";
import { prefersReducedMotion } from "../effects/motion";
import styles from "./Footer.module.css";

const ShapeWaves = lazy(() => import("../effects/ShapeWaves"));

/** Faixa animada com o handle recortado. Só carrega perto da tela e se houver WebGPU.
 *  O texto vazado fica sempre por baixo; a animação só aparece quando está desenhando
 *  (data-ready), então sem suporte ou com erro a faixa nunca fica vazia. */
function WavesBand() {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(
    () => typeof navigator === "undefined" || !("gpu" in navigator),
  );

  useEffect(() => {
    if (failed || !ref.current || !("IntersectionObserver" in window))
      return undefined;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setNear(true),
      {
        rootMargin: "400px",
      },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [failed]);

  const showCanvas = near && !failed;

  return (
    <div ref={ref} className={styles.band} aria-hidden="true">
      <span className={styles.bandText}>{profile.handle}</span>
      {showCanvas && (
        <div className={styles.wavesLayer}>
          <Suspense fallback={null}>
            <ShapeWaves
              text={profile.handle}
              fontFamily="Syne, sans-serif"
              fontWeight={800}
              textSize={0.62}
              shapes="mixed"
              cellSize={9}
              dotSize={0.7}
              color="#5a1414"
              hoverColor="#ffd100"
              backgroundColor="#0a0a0a"
              speed={0.6}
              brightness={0.4}
              fade={0.3}
              glow={0.35}
              intro={!prefersReducedMotion()}
              onError={() => setFailed(true)}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}

/** Rodapé enxuto: links e redes ficam no menu e na seção de Contato, logo acima. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <WavesBand />
      <div className={`container ${styles.bottom}`}>
        <span className={styles.logo}>{profile.handle}</span>
        <PulseHeart />
        <p className={styles.copy}>
          © {year} <span className={styles.copyAccent}>{profile.fullName}</span>
        </p>
      </div>
    </footer>
  );
}
