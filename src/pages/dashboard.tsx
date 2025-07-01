import AddContentComponent from "@/components/add-content-component";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { AIQueryResponse } from "@/lib/ai";
import { DeleteContentHandler, GetAllContent } from "@/lib/content";
import { contentsAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { ArrowRightIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [textRef, setTextRef] = useState<string | null>(null);
  const [aiTextResponse, setAiResponse] = useState<string | null>();
  const [contents, setContents] = useAtom(contentsAtom);
  const navigate = useNavigate();

  useEffect(() => {
    async function main() {
      const response = await GetAllContent();
      if (!response) {
        navigate("/signin");
        return;
      }

      response.forEach((element: any) => {
        if (element.type === "twitter") {
          const url = element.url;
          const tweetId = url.split("status/")[1];
          if (tweetId) {
            element.url = `https://twitter.com/username/status/${tweetId}`;
            return;
          }
          element.url = null;
        } else if (element.type === "youtube") {
          const url = element.url;
          const ytId = url.split("youtu.be/")[1];
          if (ytId) {
            element.url = `https://www.youtube.com/embed/${ytId}`;
            return;
          }
          element.url = null;
        } else if (element.type === "figma") {
          const url = element.url;
          const figmaId = url.split("design/")[1];
          if (figmaId) {
            element.url = `https://embed.figma.com/design/${figmaId}?node-id=0-1&embed-host=share`;
            return;
          }
          element.url = null;
        } else if (element.type === "spotify") {
          const url = element.url;

          if (!url || typeof url !== "string" || !url.startsWith("http")) {
            element.url = null;
            return;
          }

          try {
            const parsedUrl = new URL(url);
            const segments = parsedUrl.pathname.split("/").filter(Boolean);
            const spotifyType = segments[0];
            const spotifyId = segments[1];

            if (spotifyType && spotifyId) {
              element.url = `https://open.spotify.com/embed/${spotifyType}/${spotifyId}`;
            } else {
              element.url = null;
            }
          } catch (err) {
            console.error("Error parsing Spotify URL:", err);
            element.url = null;
          }
        }
      });

      setContents(response);
    }
    main();
  }, []);

  async function AIResponse() {
    if (!textRef) {
      return;
    }
    const response = await AIQueryResponse(textRef);
    if (!response) {
      return;
    }
    setAiResponse(response);
  }

  return (
    <>
      <div className="mx-auto max-w-4xl w-full px-6 md:px-12 mt-24 mb-12">
        <div className="border rounded-2xl max-w-md mx-auto p-2 py-1 flex flex-col">
          <div
            onInput={(e) => {
              setTextRef(e.currentTarget.textContent);
            }}
            suppressContentEditableWarning
            contentEditable
            className="relative border-none outline-none p-1 h-16 overflow-y-scroll text-neutral-900"
          >
            {!textRef && (
              <input
                readOnly
                defaultValue={"Ask Anything"}
                className="absolute top-1 text-neutral-400"
              />
            )}
          </div>
          <div
            onClick={() => {
              AIResponse();
            }}
            className="flex justify-between items-center bg-fuchsia-500 w-fit h-fit rounded-full p-1 self-end cursor-pointer"
          >
            <ArrowRightIcon
              className="text-neutral-50 size-4"
              strokeWidth={3}
            />
          </div>
        </div>
        {aiTextResponse && (
          <div className="max-w-md mx-auto rounded-2xl mt-2 py-3 px-4 border bg-neutral-100 overflow-y-scroll">
            {aiTextResponse}
          </div>
        )}
        <AddContentComponent />
        <div className="lg:columns-2 columns-1 gap-4">
          {contents.map((content) => {
            return (
              <div
                key={content._id}
                className="border shadow-sm rounded-md p-4 break-inside-avoid mb-4"
              >
                <div className="flex justify-between items-center ">
                  <Badge className="" variant="default">
                    {content.type}
                  </Badge>
                  <Trash2Icon
                    onClick={async () => {
                      const response = await DeleteContentHandler(content._id);
                      if (!response) {
                        return;
                      }
                      setContents((prev) => {
                        const newContent = prev.filter(
                          (e) => e._id != content._id,
                        );

                        return newContent;
                      });
                    }}
                    className="size-4 cursor-pointer"
                  />
                </div>
                <h1 className="text-neutral-900 text-xl mt-2">
                  {content.title}
                </h1>
                <p className="text-neutral-500 text-sm mt-2">
                  {content.description}
                </p>
                {content.url && content.type === "twitter" && (
                  <div className="mt-2">
                    <blockquote className="twitter-tweet">
                      <a href={content.url}></a>
                    </blockquote>
                  </div>
                )}
                {content.url && content.type === "youtube" && (
                  <div className="mt-2">
                    <iframe
                      src={content.url}
                      title="YouTube video player"
                      className="w-full h-48 rounded-md object-fit-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {content.url && content.type === "figma" && (
                  <div className="mt-2">
                    <iframe
                      className="w-full h-80 rounded-md border"
                      src="https://embed.figma.com/design/H99b6eNyPJRtpwpAZicvrv/Untitled?node-id=0-1&embed-host=share"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {content.url && content.type === "spotify" && (
                  <iframe
                    src={content.url}
                    width="100%"
                    height="352"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
