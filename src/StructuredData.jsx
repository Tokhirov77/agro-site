// StructuredData.jsx
// Добавляет разметку Schema.org Organization — помогает Google
// однозначно связать домен agrius.uz с брендами "Агриус" и "Велес Агро".
//
// Куда вставить: импортируйте и добавьте <StructuredData /> один раз
// в корневой компонент (например App.jsx), рядом с <Seo />.

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Agrius",
    // Все варианты написания бренда, по которым вас ищут:
    "alternateName": [
      "Veles Agro",
      "Агриус",
      "Велес Агро",
      "Agrius & Veles Agro"
    ],
    "url": "https://www.agrius.uz/",
    "logo": "https://www.agrius.uz/images/logo/agrius.jpg",
    "description":
      "Agrius и Veles Agro — поставщики семян сельскохозяйственных культур в Узбекистане. Гибриды томата, огурца, перца, капусты и кукурузы для фермеров.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UZ"
      // при желании: добавьте addressLocality, streetAddress
    },
    // Ссылки на соцсети компании — усиливают доверие к бренду в глазах Google.
    // Замените на реальные ссылки (у вас в коде уже есть иконки telegram/instagram/youtube/whatsapp)
    "sameAs": [
      // "https://t.me/hmclause_uzb",
      // "https://www.instagram.com/veles_agro_uz/",
      // "https://www.youtube.com/@Agriusvelesagro",
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
