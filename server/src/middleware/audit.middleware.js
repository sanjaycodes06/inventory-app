export function auditMutations(req, res, next) {
  res.on("finish", () => {
    if (["POST", "PATCH", "PUT", "DELETE"].includes(req.method)) {
      // Persist AuditLog in route handlers or queue
    }
  });
  next();
}
