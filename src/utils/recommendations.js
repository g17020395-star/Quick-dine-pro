// Basic recommendation engine
// Suggests items from the same category or with keyword similarity

export function getRecommendations(selectedItem, allItems, maxResults = 4) {
  if (!selectedItem || !allItems || allItems.length === 0) return []

  const scored = allItems
    .filter(item => item.id !== selectedItem.id && item.is_available)
    .map(item => {
      let score = 0

      // Same category = highest match
      if (item.category === selectedItem.category) score += 10

      // Keyword similarity in name
      const selectedWords = selectedItem.name.toLowerCase().split(/\s+/)
      const itemWords = item.name.toLowerCase().split(/\s+/)
      const commonWords = selectedWords.filter(w => itemWords.includes(w))
      score += commonWords.length * 3

      // Same veg/non-veg preference
      if (item.is_veg === selectedItem.is_veg) score += 2

      // Similar price range (within 30%)
      const priceDiff = Math.abs(item.price - selectedItem.price) / selectedItem.price
      if (priceDiff <= 0.3) score += 2

      return { ...item, _score: score }
    })
    .filter(item => item._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, maxResults)

  return scored
}

// Get recommendations based on cart items
export function getCartRecommendations(cartItems, allItems, maxResults = 4) {
  if (!cartItems || cartItems.length === 0 || !allItems) return []

  const cartIds = new Set(cartItems.map(i => i.id))
  const allRecs = []

  for (const cartItem of cartItems) {
    const recs = getRecommendations(cartItem, allItems, 6)
    for (const rec of recs) {
      if (!cartIds.has(rec.id) && !allRecs.find(r => r.id === rec.id)) {
        allRecs.push(rec)
      }
    }
  }

  return allRecs.slice(0, maxResults)
}
