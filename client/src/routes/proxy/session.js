export async function post(req, res) {
  req.session.user = { ...req.body };

  res.end(JSON.stringify({ ok: true }));
}

export async function del(req, res) {
  delete req.session.user;

  res.end(JSON.stringify({ ok: true }));
}
