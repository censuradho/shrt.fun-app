import { Button } from "@/components/Button"
import { IconButton } from "@/components/IconButton"
import { Icon } from "@/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { downloadQrCode } from "@/utils/downloadQrCode"
import { QRCodePreview } from "../../create/components/QRCodePreview"
import { useNavigate } from "react-router"
import { resolvePath } from "@/utils/resolvePath"
import { paths } from "@/constants/routes"

interface QRCodeSectionProps {
  urlId: string
  qrCode: string | undefined
  isPending: boolean
}

export function QRCodeSection ({ urlId, qrCode, isPending }: QRCodeSectionProps) {
  const navigate = useNavigate()

  return (
    <section className="w-full mt-6 flex flex-col card px-4 py-6">
      <h2 className="text-lg">QR Code</h2>
      <div className="mt-6">
        <div className="grid md:flex items-start gap-3.5">
          <QRCodePreview
            src={qrCode ?? null}
            isPending={isPending}
          />
          <div className="flex items-center gap-4">
            <Button variant="ghost">Ver detalhes</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton icon={{ name: 'Ellipsis' }} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Opções de download</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => qrCode && downloadQrCode(qrCode, 'svg')}>
                    <Icon name="Download" />
                    Download SVG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => qrCode && downloadQrCode(qrCode, 'png')}>
                    <Icon name="Download" />
                    Download PNG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => qrCode && downloadQrCode(qrCode, 'jpg')}>
                    <Icon name="Download" />
                    Download JPEG
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(resolvePath(paths.private.link.qrCustomize, { id: urlId })) }>
                  <Icon name="PaintRoller" />
                  Customizar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </section>
  )
}
