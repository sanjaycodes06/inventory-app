export async function paginate(model, filter, { page = 1, limit = 20, populate } = {}) {
  const skip = (page - 1) * limit;
  let query = model.find(filter).skip(skip).limit(limit).sort({ updatedAt: -1 });
  if (populate) {
    query = typeof populate === "string" ? query.populate(populate) : query.populate(populate);
  }
  const [items, total] = await Promise.all([query.lean(), model.countDocuments(filter)]);
  return { items, total, page, limit };
}
