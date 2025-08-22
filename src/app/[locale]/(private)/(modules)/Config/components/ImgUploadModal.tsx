"use client"

import { Box, Button, Dialog } from "@mui/material";
import { useState } from "react";
import Cropper, { Point } from "react-easy-crop";
import { fetchAuth } from "../../../../../hooks/use-fetch-auth";
interface UploadImgModalProps {
  open: boolean;
  uploadImg: File;
  onClose?: () => void;
}

export default function UploadImgModal({ onClose, open, uploadImg }: UploadImgModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropChange = (crop: Point) => {
    setCrop(crop)
  }
  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  }

  const handleSave = async () => {
    const res = await fetchAuth<{ uploadUrl: string; finalUrl: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile-img/url`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileType: uploadImg.type,
        }),
      }
    );

    if (!res) throw new Error("Falha ao obter a URL de upload");
    const { uploadUrl, finalUrl } = res;

    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": uploadImg.type },
      body: uploadImg,
    });

    console.log("Imagem disponível em:", finalUrl);
    onClose?.();
  };

  return (
    <Dialog open={open}>
      <Box sx={{ width: 500, height: 500 }}>
        <Cropper
          image={URL.createObjectURL(uploadImg)}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
        />
      </Box>
      <Button onClick={handleSave}>Salvar</Button>
    </Dialog>
  )
}