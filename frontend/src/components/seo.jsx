import { SEO_DEFAULT } from "../config/seoConfig";

export default function Seo({ title, description, ogImage, url }) {
    return (
        <Helmet>
            <title>{title || SEO_DEFAULT.title}</title>
            <meta name="description" content={description || SEO_DEFAULT.description} />
            <meta property="og:title" content={title || SEO_DEFAULT.title} />
            <meta property="og:description" content={description || SEO_DEFAULT.description} />
            <meta property="og:image" content={ogImage || SEO_DEFAULT.ogImage} />
            <meta property="og:url" content={url || SEO_DEFAULT.url} />
            <link rel="canonical" href={url || SEO_DEFAULT.url} />
        </Helmet>
    );
}
