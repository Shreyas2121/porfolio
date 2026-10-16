export function getYouTubeLinks(videoId: string) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    throw new Error("Project walkthroughs require an 11-character YouTube video ID.");
  }

  return {
    watch: `https://www.youtube.com/watch?v=${videoId}`,
    embed: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`,
  };
}
