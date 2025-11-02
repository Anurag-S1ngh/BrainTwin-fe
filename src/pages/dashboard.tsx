import AddContentComponent from "@/components/add-content-component";
import { Combobox } from "@/components/combobox";
import { EmbedContent } from "@/components/embed-content";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { AIQueryResponse } from "@/lib/ai";
import { DeleteContentHandler, GetAllContent } from "@/lib/content";
import { ElementUrl } from "@/lib/element-url";
import { contentsAtom, filteredContentAtom } from "@/lib/store";
import type { AIResponse } from "@/lib/types";
import { useAtomValue, useSetAtom } from "jotai";
import { ArrowRightIcon, Loader, Loader2Icon, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Dashboard() {
  const [text, setText] = useState<string | null>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const [aiTextResponse, setAiResponse] = useState<AIResponse | null>();
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
  const setContents = useSetAtom(contentsAtom);
  const filteredContents = useAtomValue(filteredContentAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function main() {
      const response = await GetAllContent();
      if (!response) {
        navigate("/signin");
        return;
      }

      response.forEach((element: any) => {
        element.url = ElementUrl(element.type, element.url);
      });

      setContents(response);
      setLoading(false);
    }
    main();
  }, []);

  async function AIResponse() {
    if (!text) {
      return;
    }
    const response = await AIQueryResponse(text);
    setIsRequestSent(false);
    if (response.msg === "ai response fetched") {
      setAiResponse({ answer: response, question: text });
    } else if (response.error) {
      toast.error(response.error);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-neutral-400 h-10 w-10" />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-4xl px-6 md:px-12 mt-24 mb-12 min-h-90">
        <div className="border rounded-2xl max-w-md mx-auto p-2 py-1 flex flex-col">
          <div
            ref={textRef}
            onInput={(e) => {
              setText(e.currentTarget.textContent);
            }}
            suppressContentEditableWarning
            contentEditable="plaintext-only"
            className="relative border-none outline-none p-1 h-16 overflow-y-scroll text-neutral-900"
          >
            {!text && (
              <input
                readOnly
                defaultValue={"Ask Anything"}
                className="absolute top-1 text-neutral-400 pointer-events-none"
              />
            )}
          </div>
          <div className="self-end flex gap-2 justify-end items-end">
            <p className="text-secondary-foreground/40 text-xs">
              Limit: 50req/day
            </p>
            <div
              onClick={() => {
                if (isRequestSent) {
                  return;
                }
                setIsRequestSent(true);
                AIResponse();
              }}
              className={`flex justify-between items-center w-fit h-fit rounded-full p-1 cursor-pointer ${isRequestSent ? "bg-neutral-400" : "bg-fuchsia-500"} `}
            >
              {isRequestSent ? (
                <Loader2Icon
                  className="animate-spin size-4 text-neutral-50"
                  strokeWidth={3}
                />
              ) : (
                <>
                  <ArrowRightIcon
                    className={`text-neutral-50 size-4`}
                    strokeWidth={3}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {aiTextResponse && (
          <div className="max-w-md mx-auto rounded-2xl mt-2 py-3 px-4 border bg-neutral-100 overflow-y-scroll flex flex-col gap-2">
            <p className="text-neutral-500 -mb-2 text-sm">
              &gt;&gt; {aiTextResponse.question}
            </p>
            {aiTextResponse.answer}
          </div>
        )}
        <div className="mt-8 mb-8 flex gap-4">
          <AddContentComponent />
          <Combobox />
        </div>
        <div className="lg:columns-2 columns-1 gap-4">
          {filteredContents.map((content) => {
            return (
              <div
                key={content._id}
                className="border shadow-sm rounded-md p-4 break-inside-avoid mb-4"
              >
                <div className="flex justify-between items-center ">
                  <Badge>{content.type}</Badge>
                  <Trash2Icon
                    className="size-4 cursor-pointer hover:text-neutral-500"
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
                  />
                </div>
                <h1 className="text-neutral-900 text-xl mt-2">
                  {content.title}
                </h1>
                <p className="text-neutral-500 text-sm mt-2">
                  {content.description}
                </p>
                {content.url && (
                  <EmbedContent type={content.type} url={content.url} />
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
