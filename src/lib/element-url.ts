export const ElementUrl = (type: string, url: string) => {
  switch (type) {
    case "twitter":
      const tweetId = url.split("status/")[1];
      if (tweetId) {
        return `https://twitter.com/username/status/${tweetId}`;
      }
      return null;

    case "youtube":
      const ytId =
        url.split("youtu.be/")[1] ?? url.split("youtube.com/watch?v=")[1];
      if (ytId) {
        return `https://www.youtube.com/embed/${ytId}`;
      }
      return null;

    case "figma":
      const figmaId = url.split("design/")[1];
      if (figmaId) {
        return `https://embed.figma.com/design/${figmaId}?node-id=0-1&embed-host=share`;
      }
      return null;

    case "spotify":
      const spotifyType = url.split("spotify.com/")[1];
      const spotifyId = url.split("spotify.com/")[2];

      if (spotifyType && spotifyId) {
        return `https://open.spotify.com/embed/${spotifyType}/${spotifyId}`;
      }
      return null;

    default:
      break;
  }
};
