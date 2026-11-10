/** Utilitários de mídia: detecção de provedor de vídeo e slugs. */

export type VideoSource =
  | { type: "youtube"; id: string; embedUrl: string; thumbnail: string }
  | { type: "vimeo"; id: string; embedUrl: string; thumbnail: null }
  | { type: "file"; url: string }
  | null;

const YOUTUBE_RE =
  /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i;
const VIMEO_RE = /vimeo\.com\/(?:video\/)?(\d+)/i;

/** Identifica se a URL é YouTube, Vimeo ou um arquivo de vídeo direto. */
export function parseVideo(url: string | null | undefined): VideoSource {
  const value = url?.trim();
  if (!value) return null;

  const yt = value.match(YOUTUBE_RE);
  if (yt) {
    return {
      type: "youtube",
      id: yt[1],
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0&modestbranding=1`,
      thumbnail: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`,
    };
  }

  const vm = value.match(VIMEO_RE);
  if (vm) {
    return {
      type: "vimeo",
      id: vm[1],
      embedUrl: `https://player.vimeo.com/video/${vm[1]}?dnt=1`,
      thumbnail: null,
    };
  }

  return { type: "file", url: value };
}

/** Indica se a URL aponta para um arquivo de vídeo (mp4/webm/mov). */
export function isVideoFileUrl(url: string | null | undefined): boolean {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url ?? "");
}

/** Gera um slug URL-safe a partir de um título (remove acentos). */
export function slugify(input: string): string {
  return (
    input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "projeto"
  );
}

/** Extrai o caminho do objeto no bucket a partir de uma URL pública. */
export function storagePathFromUrl(url: string, bucket = "media"): string | null {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(url.slice(idx + marker.length).split("?")[0]);
}
