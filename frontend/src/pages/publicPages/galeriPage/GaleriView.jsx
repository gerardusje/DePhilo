import React from "react";
import { RowsPhotoAlbum } from "react-photo-album";

export default function GaleriView({ photos, navigate }) {
  return (
    <RowsPhotoAlbum
      photos={photos}
      spacing={8}
      targetRowHeight={120}
      onClick={({ index }) => {
        const clicked = photos[index];
        if (clicked?.id) navigate(`/galeri/${clicked.id}`);
      }}
      render={{
        wrapper: ({ photo, style, key, ...rest }) => (
          <div
            key={key}
            style={{
              ...style,
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow:
                "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px rgba(0,0,0,0.14), 0px 1px 14px rgba(0,0,0,0.12)",
              cursor: "pointer",
            }}
            {...rest}
          >
            <img
              src={photo.src}
              alt={photo.title || "Foto"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ),
      }}
    />
  );
}
