const POLAR_ORG_ID = 'fe877bbf-5578-4ebb-a657-b185432fdb62'
const POLAR_ACCESS_TOKEN = 'polar_oat_uFlAd8wGl4Vj3iBsnikJCifALba6dsrKqtoYU3VLFBQ'

export interface PolarProduct {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  created_at: string
  updated_at: string
}

export async function fetchProducts(): Promise<PolarProduct[]> {
  try {
    const response = await fetch(
      `https://api.polar.sh/api/v1/organizations/${POLAR_ORG_ID}/products`,
      {
        headers: {
          'Authorization': `Bearer ${POLAR_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }

    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
} 