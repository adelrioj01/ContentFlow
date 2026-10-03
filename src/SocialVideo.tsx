import {Audio} from '@remotion/media';
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type {CSSProperties} from 'react';
import type {Scene, VideoProps} from './types';

const FONT = 'Arial, Helvetica, sans-serif';

const fitSize = (text: string, max = 104) => {
  if (text.length > 75) return Math.min(max, 64);
  if (text.length > 48) return Math.min(max, 76);
  if (text.length > 28) return Math.min(max, 90);
  return max;
};

const Background = ({accent, image}: Pick<Scene, 'accent' | 'image'>) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const drift = interpolate(frame, [0, 8 * fps], [-80, 120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#090B10'}}>
      {image ? (
        <Img
          src={staticFile(image)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.42,
            transform: `scale(1.13) translateY(${drift * 0.08}px)`,
          }}
        />
      ) : null}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 76% 18%, ${accent}55 0, transparent 34%), linear-gradient(155deg, #151923 0%, #07080c 65%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 720,
          height: 720,
          right: -310 + drift,
          top: 210,
          border: `3px solid ${accent}66`,
          borderRadius: '50%',
        }}
      />
    </AbsoluteFill>
  );
};

const Caption = ({text, accent, sceneDuration}: {text: string; accent: string; sceneDuration: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.trim().split(/\s+/);
  const index = Math.min(
    words.length - 1,
    Math.floor((frame / Math.max(1, sceneDuration)) * words.length),
  );
  const pageStart = Math.floor(index / 5) * 5;
  const page = words.slice(pageStart, pageStart + 5);
  const entrance = spring({frame: frame % Math.max(1, Math.round(fps * 0.8)), fps, config: {damping: 200}});

  return (
    <div
      style={{
        position: 'absolute',
        left: 76,
        right: 76,
        bottom: 265,
        textAlign: 'center',
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 67,
        lineHeight: 1.08,
        textTransform: 'uppercase',
        textShadow: '0 6px 22px #000',
        transform: `scale(${0.96 + entrance * 0.04})`,
      }}
    >
      {page.map((word, wordIndex) => {
        const absoluteIndex = pageStart + wordIndex;
        return (
          <span key={`${absoluteIndex}-${word}`} style={{color: absoluteIndex === index ? accent : '#fff'}}>
            {word}{' '}
          </span>
        );
      })}
    </div>
  );
};

const SceneCard = ({scene, index, total, sceneDuration}: {scene: Scene; index: number; total: number; sceneDuration: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 170}});
  const exit = interpolate(frame, [sceneDuration - 0.35 * fps, sceneDuration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const contentStyle: CSSProperties = {
    opacity: exit,
    transform: `translateY(${(1 - enter) * 95}px) scale(${0.93 + enter * 0.07})`,
  };

  return (
    <AbsoluteFill>
      <Background accent={scene.accent} image={scene.image} />
      <div style={{position: 'absolute', top: 0, left: 0, height: 10, width: `${((index + frame / sceneDuration) / total) * 100}%`, background: scene.accent}} />
      <div style={{position: 'absolute', top: 94, left: 76, right: 76, display: 'flex', justifyContent: 'space-between', fontFamily: FONT}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <div style={{padding: '10px 18px', borderRadius: 12, background: scene.accent, color: '#080A0E', fontSize: 27, fontWeight: 950}}>AINSIDER</div>
          <div style={{fontSize: 24, fontWeight: 800, color: '#ffffffb8'}}>IA PRÁCTICA</div>
        </div>
        <div style={{fontSize: 27, color: '#ffffffaa'}}>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
      </div>
      <div style={{position: 'absolute', right: 54, top: 185, fontFamily: FONT, fontSize: 330, fontWeight: 950, lineHeight: 1, color: `${scene.accent}18`}}>{index + 1}</div>
      <div style={{position: 'absolute', top: 350, left: 76, right: 76, ...contentStyle}}>
        <div style={{fontFamily: FONT, fontWeight: 950, fontSize: fitSize(scene.title), lineHeight: 0.94, letterSpacing: -4, color: '#fff'}}>
          {scene.title}
        </div>
        <div style={{width: 170, height: 12, marginTop: 46, marginBottom: 44, borderRadius: 20, background: scene.accent}} />
        <div style={{fontFamily: FONT, fontSize: 46, lineHeight: 1.28, fontWeight: 600, color: '#E9EDF5'}}>{scene.body}</div>
      </div>
      <Caption text={`${scene.title} ${scene.body}`} accent={scene.accent} sceneDuration={sceneDuration} />
    </AbsoluteFill>
  );
};

export const SocialVideo = (props: VideoProps) => {
  const {fps} = useVideoConfig();
  let cursor = 0;

  return (
    <AbsoluteFill style={{background: '#090B10'}}>
      {props.scenes.map((scene, index) => {
        const duration = Math.round(scene.durationSeconds * fps);
        const start = cursor;
        cursor += duration;
        return (
          <Sequence key={`${index}-${scene.title}`} from={start} durationInFrames={duration} premountFor={fps}>
            <SceneCard scene={scene} index={index} total={props.scenes.length} sceneDuration={duration} />
          </Sequence>
        );
      })}
      {props.voiceover ? (
        <Audio src={staticFile(props.voiceover)} volume={props.voiceVolume} />
      ) : null}
      {props.music ? (
        <Audio src={staticFile(props.music)} loop volume={props.musicVolume} />
      ) : null}
      <div style={{position: 'absolute', left: 76, right: 76, bottom: 94, display: 'flex', justifyContent: 'space-between', fontFamily: FONT, fontSize: 28, fontWeight: 800, color: '#fff'}}>
        <span>{props.handle}</span>
        <span>{props.callToAction}</span>
      </div>
    </AbsoluteFill>
  );
};
