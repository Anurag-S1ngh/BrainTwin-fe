import type { ContentType } from "@/lib/types";

interface EmbedContentInterface {
  type: ContentType;
  url: string;
}

export const EmbedContent = ({ type, url }: EmbedContentInterface) => {
  return (
    <>
      {type === "twitter" && (
        <div className="mt-2">
          <blockquote className="twitter-tweet">
            <a href={url}></a>
          </blockquote>
        </div>
      )}
      {type === "youtube" && (
        <div className="mt-2">
          <iframe
            src={url}
            title="YouTube video player"
            className="w-full h-48 rounded-md object-fit-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {type === "figma" && (
        <div className="mt-2">
          <iframe
            className="w-full h-80 rounded-md border"
            src="https://embed.figma.com/design/H99b6eNyPJRtpwpAZicvrv/Untitled?node-id=0-1&embed-host=share"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {type === "spotify" && (
        <iframe
          src={url}
          width="100%"
          height="352"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      )}
    </>
  );
};
