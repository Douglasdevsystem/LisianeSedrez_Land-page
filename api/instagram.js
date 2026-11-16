// Busca os posts mais recentes do Instagram (Instagram API com login do Instagram).
// Requer a variável de ambiente INSTAGRAM_TOKEN no Vercel (token de longa duração).
// A resposta fica em cache na CDN do Vercel por 1 hora.

const FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

module.exports = async (req, res) => {
  const token = process.env.INSTAGRAM_TOKEN;
  if (!token) {
    res.status(503).json({ error: "INSTAGRAM_TOKEN não configurado" });
    return;
  }

  const limit = Math.min(parseInt(req.query.limit, 10) || 6, 12);
  const url = `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=${limit}&access_token=${encodeURIComponent(token)}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    if (!r.ok || data.error) {
      res.status(502).json({ error: data.error?.message || "Falha ao consultar o Instagram" });
      return;
    }

    const posts = (data.data || []).map((p) => ({
      id: p.id,
      type: p.media_type, // IMAGE | VIDEO | CAROUSEL_ALBUM
      image: p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url,
      caption: (p.caption || "").slice(0, 160),
      link: p.permalink,
      date: p.timestamp,
    }));

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json({ posts });
  } catch (e) {
    res.status(502).json({ error: "Erro de conexão com o Instagram" });
  }
};
