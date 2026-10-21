const photo = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`

export const galleryItems = [
  { title: 'Un día para siempre', alt: 'Pareja de novios en una celebración al aire libre', image: photo(15552025), category: 'Bodas' },
  { title: 'Silencio salvaje', alt: 'Fauna en su entorno natural', image: photo(37741206), category: 'Naturaleza' },
  { title: 'La forma del paisaje', alt: 'Montañas bajo la luz del día', image: photo(11795858), category: 'Paisajes' },
  { title: 'Donde fluye la calma', alt: 'Río rodeado de un paisaje natural', image: photo(38464281), category: 'Paisajes' },
]

export const packages = [
  {
    slug: 'esencial', eyebrow: '01 · RETRATO', name: 'Esencial', price: 'Desde $150', description: 'Una sesión íntima y cuidada para retratos y momentos personales.',
    features: ['1 hora de sesión', '15 fotografías editadas', 'Galería privada de entrega'],
  },
  {
    slug: 'premium', eyebrow: '02 · EXPERIENCIA', name: 'Premium', price: 'Desde $300', description: 'Más tiempo y variedad para contar una historia completa.', featured: true,
    features: ['2 horas de sesión', '30 fotografías editadas', 'Hasta 2 cambios de vestuario'],
  },
  {
    slug: 'eventos', eyebrow: '03 · COBERTURA', name: 'Eventos', price: 'Desde $600', description: 'Cobertura documental para celebraciones y encuentros especiales.',
    features: ['Hasta 4 horas de cobertura', 'Selección completa editada', 'Entrega prioritaria en 48 horas'],
  },
]
