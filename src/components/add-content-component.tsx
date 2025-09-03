import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useRef, useState } from "react";
import { AddContent } from "@/lib/content";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useSetAtom } from "jotai";
import { contentsAtom } from "@/lib/store";

export default function AddContentComponent() {
  const setContents = useSetAtom(contentsAtom);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const AddContentHandler = async () => {
    if (!titleRef.current || !descriptionRef.current || !urlRef.current) return;
    const response = await AddContent(
      titleRef.current.value,
      descriptionRef.current.value,
      urlRef.current.value,
      type,
    );
    if (!response) {
      return;
    }
    setContents((prevContents) => [...prevContents, response]);
    return;
  };
  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button>
            Add Content
            <PlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Add Content</DialogTitle>
            <DialogDescription className="flex flex-col gap-2 mt-2" asChild>
              <div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="title">
                    Title<span className="text-red-500">*</span>
                  </Label>
                  <Input ref={titleRef} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="description">
                    Description{" "}
                    <span className="text-sm text-neutral-500">(optional)</span>
                  </Label>
                  <Textarea
                    className="resize-none max-h-24"
                    ref={descriptionRef}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="url">
                    URL
                    <span className="text-sm text-neutral-500">(optional)</span>
                  </Label>
                  <Input ref={urlRef} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="tag">
                    Tag<span className="text-sm text-neutral-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(type) => {
                      console.log(type);
                      setType(type);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="youtube">Youtube</SelectItem>
                      <SelectItem value="figma">Figma</SelectItem>
                      <SelectItem value="spotify">Spotify</SelectItem>
                      <SelectItem value="spotify">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                AddContentHandler();
                setIsModalOpen(false);
              }}
              type="submit"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
