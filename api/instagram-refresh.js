// Renova o token de longa duração (válido por 60 dias) para que o feed não pare.
// Executado automaticamente pelo Cron do Vercel (ver vercel.json).

module.exports = async (req, res) => {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    res.status(401).json({ error: "não autorizado" });
    return;
  }

  const token = process.env.INSTAGRAM_TOKEN;
  if (!token) {
    res.status(503).json({ error: "INSTAGRAM_TOKEN não configurado" });
    return;
  }

  const r = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`
  );
  const data = await r.json();
  if (!r.ok || data.error) {
    res.status(502).json({ error: data.error?.message || "falha ao renovar" });
    return;
  }
  res.status(200).json({ ok: true, expires_in_days: Math.round(data.expires_in / 86400) });
};
