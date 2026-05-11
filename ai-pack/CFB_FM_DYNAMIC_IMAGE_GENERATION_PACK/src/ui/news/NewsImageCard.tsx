import type { GeneratedAsset } from "../../domain/assets/generatedAsset";

// Placeholder NewsItem type. Replace with actual type.
type NewsItem = {
  id: string;
  headline: string;
};

export function NewsImageCard({
  news,
  asset,
  onGenerate
}: {
  news: NewsItem;
  asset?: GeneratedAsset;
  onGenerate: () => void;
}) {
  if (!asset) {
    return (
      <section className="news-image-card empty">
        <div className="news-image-placeholder">
          <span>No image generated yet</span>
          <button onClick={onGenerate}>Generate Image</button>
        </div>
      </section>
    );
  }

  if (asset.status === "queued" || asset.status === "generating") {
    return (
      <section className="news-image-card loading">
        <div className="news-image-placeholder">
          Generating image...
        </div>
      </section>
    );
  }

  if (asset.status === "failed" || asset.status === "fallback") {
    return (
      <section className="news-image-card failed">
        <div className="news-image-placeholder">
          Image unavailable
          <button onClick={onGenerate}>Try Again</button>
        </div>
      </section>
    );
  }

  return (
    <section className="news-image-card">
      <img src={asset.filePath} alt={news.headline} />
      <footer>
        <span>Generated from save event</span>
        <button onClick={onGenerate}>Regenerate</button>
      </footer>
    </section>
  );
}
