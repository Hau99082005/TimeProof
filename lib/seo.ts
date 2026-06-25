import type { Metadata } from "next";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
};

type BuildArticleMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  socialTitle?: string;
};

const COMPANY_DOMAIN = process.env.COMPANY_DOMAIN;

const DEFAULT_SITE_URL = COMPANY_DOMAIN ?? "https://vin-bhxh.vn";
const DEFAULT_OG_IMAGE = "/icons/Logo/Logo.png";

const trimSlash = (value: string) => value.replace(/\/+$/, "");

export const getSiteUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!envUrl) return DEFAULT_SITE_URL;

  try {
    return trimSlash(new URL(envUrl).toString());
  } catch {
    return DEFAULT_SITE_URL;
  }
};

export const toAbsoluteUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) return path;
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
};

export const isProductionSite = () => getSiteUrl() === DEFAULT_SITE_URL;

export const buildPageMetadata = ({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  keywords = [],
  noIndex,
}: BuildPageMetadataInput): Metadata => {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const siteUrl = getSiteUrl();
  const siteDomain = siteUrl.replace(/^https?:\/\//, "");
  const normalizedTitle = title.replace(/\s*\|\s*Visnam\s*$/i, "").trim();
  const keywordList = (
    keywords.length > 0 ? keywords : [normalizedTitle, "Visnam"]
  )
    .map((item) => item.trim())
    .filter(Boolean);
  const keywordValue = keywordList.join(", ");
  const robots = noIndex
    ? {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      }
    : "index, follow";

  return {
    title,
    description,
    keywords: keywordList,
    authors: [{ name: "hau99082005@gmail.com" }],
    creator: "hau99082005@gmail.com",
    publisher: "TimeProof",
    alternates: { canonical },
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "TimeProof",
      locale: "vi_VN",
      type,
      images: [{ url: image, width: 260, height: 200 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    other: {
      author: "hau99082005@gmail.com",
      copyright: "@TimeProof",
      "resource-type": "document",
      distribution: "global",
      "Googlebot-News": "index, follow, archive, snippet",
      googlebot: "index, follow, archive, snippet",
      "revisit-after": "1 days",
      rating: "general",
      language: "vi",
      "geo.region": "VN-DN",
      "geo.placename": "Thành phố Đà Nẵng",
      "geo.position": "16.07881, 108.21482",
      ICBM: "16.07881, 108.21482",
      news_keywords: keywordValue,
      "twitter:domain": siteDomain,
      "DC.title": title,
      "DC.description": description,
      "DC.keywords": keywordValue,
      "DC.creator": "hau99082005@gmail.com",
      "DC.publisher": "TimeProof",
      "DC.format": "text/html",
      "DC.language": "vi",
    },
  };
};

export const buildArticleMetadata = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  keywords = [],
  socialTitle,
}: BuildArticleMetadataInput): Metadata => {
  const resolvedSocialTitle =
    socialTitle?.trim() || title.replace(/\s*\|\s*Visnam\s*$/i, "").trim();
  const normalizedKeywords = (
    keywords.length > 0 ? keywords : [resolvedSocialTitle, "Visnam"]
  )
    .map((item) => item.trim())
    .filter(Boolean);
  const keywordValue = normalizedKeywords.join(", ");
  const base = buildPageMetadata({
    title,
    description,
    path,
    image,
    type: "article",
    keywords: normalizedKeywords,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      title: resolvedSocialTitle,
      description,
      url: toAbsoluteUrl(path),
      type: "article",
      images: [
        { url: image, width: 260, height: 200, alt: resolvedSocialTitle },
      ],
    },
    twitter: {
      ...base.twitter,
      card: "summary_large_image",
      title: resolvedSocialTitle,
      description,
      images: [image],
    },
    other: {
      ...base.other,
      news_keywords: keywordValue,
      "DC.title": resolvedSocialTitle,
      "DC.description": description,
      "DC.keywords": keywordValue,
    } as unknown as Record<string, string>,
  };
};
