import {Composition, type CalculateMetadataFunction} from 'remotion';
import example from '../content/example.json';
import {SocialVideo} from './SocialVideo';
import {getDurationSeconds, type VideoProps, videoSchema} from './types';

const FPS = 30;

const calculateMetadata: CalculateMetadataFunction<VideoProps> = async ({props}) => {
  const parsed = videoSchema.parse(props);
  return {
    durationInFrames: Math.ceil(getDurationSeconds(parsed) * FPS),
    props: parsed,
    defaultOutName: 'short-video.mp4',
  };
};

export const RemotionRoot = () => (
  <Composition
    id="SocialVideo"
    component={SocialVideo}
    fps={FPS}
    width={1080}
    height={1920}
    durationInFrames={30 * FPS}
    defaultProps={videoSchema.parse(example)}
    calculateMetadata={calculateMetadata}
  />
);
