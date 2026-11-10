"use client";

import { useId, useRef, useState } from "react";
import { AlertCircle, Loader2, Trash2, UploadCloud } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isVideoFileUrl, parseVideo } from "@/lib/media";
import { Input } from "@/components/ui/input";

type Props = {
  /** nome do campo enviado no formulário */
  name: string;
  label: string;
  /** "media" aceita imagem ou vídeo (ex.: fundo do hero) */
  kind: "image" | "video" | "media";
  /** pasta dentro do bucket `media` */
  folder: "videos" | "thumbnails" | "site";
  defaultValue?: string | null;
  hint?: string;
  /** permite colar um link (YouTube/Vimeo/URL) além de enviar arquivo */
  allowUrl?: boolean;
  placeholder?: string;
};

const MAX_MB = { image: 10, video: 500, media: 200 } as const;
const ACCEPT = {
  image: "image/jpeg,image/png,image/webp,image/avif",
  video: "video/mp4,video/webm,video/quicktime",
  media:
    "image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm,video/quicktime",
} as const;

/**
 * Campo de mídia: envia o arquivo direto do navegador para o Supabase Storage
 * (sem passar pelo servidor, então não esbarra no limite de tamanho das
 * Server Actions) e guarda a URL pública em um input oculto/editável.
 */
export function MediaUpload({
  name,
  label,
  kind,
  folder,
  defaultValue,
  hint,
  allowUrl = true,
  placeholder,
}: Props) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);

    if (file.size > MAX_MB[kind] * 1024 * 1024) {
      setError(`Arquivo muito grande (máx. ${MAX_MB[kind]} MB).`);
      return;
    }

    setUploading(true);
    try {
      const supabase = createClient();
      const ext = (file.name.split(".").pop() ?? "bin").toLowerCase();
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(path, file, {
          cacheControl: "31536000",
          upsert: false,
          contentType: file.type || undefined,
        });
      if (uploadError) throw new Error(uploadError.message);

      const {
        data: { publicUrl },
      } = supabase.storage.from("media").getPublicUrl(path);
      setUrl(publicUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Falha no upload: ${err.message}`
          : "Falha no upload.",
      );
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const video = kind === "video" ? parseVideo(url) : null;
  const urlIsVideoFile = isVideoFileUrl(url);
  const showImage =
    Boolean(url) && (kind === "image" || (kind === "media" && !urlIsVideoFile));
  const showVideoFile =
    kind === "video"
      ? video?.type === "file"
      : kind === "media" && urlIsVideoFile;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-medium text-mist-300"
      >
        {label}
      </label>

      {/* Pré-visualização */}
      {(showImage || showVideoFile || video?.type === "youtube") && (
        <div className="mb-3 overflow-hidden rounded-xl border border-ink-700 bg-black">
          {showImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={url} alt="" className="max-h-56 w-full object-contain" />
          ) : showVideoFile ? (
            <video
              src={url}
              controls
              preload="metadata"
              playsInline
              className="max-h-56 w-full"
            />
          ) : video?.type === "youtube" ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={video.thumbnail}
              alt=""
              className="max-h-56 w-full object-contain"
            />
          ) : null}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        {allowUrl ? (
          <Input
            id={inputId}
            name={name}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={
              placeholder ??
              (kind === "video"
                ? "Cole um link do YouTube/Vimeo ou envie um arquivo"
                : "Cole uma URL ou envie uma imagem")
            }
            inputMode="url"
          />
        ) : (
          <>
            <input type="hidden" name={name} value={url} />
            <div
              id={inputId}
              className="flex h-12 flex-1 items-center truncate rounded-xl border border-ink-700 bg-ink-900/60 px-4 text-sm text-mist-500"
            >
              {url ? "Arquivo enviado" : "Nenhum arquivo"}
            </div>
          </>
        )}

        <input
          ref={fileRef}
          type="file"
          accept={ACCEPT[kind]}
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
        />

        <div className="flex gap-2">
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-ink-600 px-4 text-sm text-mist-100 transition-colors hover:border-sky-glow hover:text-sky-glow disabled:opacity-50 sm:flex-none"
          >
            {uploading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <UploadCloud size={16} />
                Enviar arquivo
              </>
            )}
          </button>
          {url && (
            <button
              type="button"
              aria-label="Remover"
              onClick={() => setUrl("")}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink-600 text-mist-300 transition-colors hover:border-red-500/50 hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {hint && !error && <p className="mt-2 text-xs text-mist-500">{hint}</p>}
      {error && (
        <p role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
}
