import { Button } from "@/components/Button"
import { IconButton } from "@/components/IconButton"
import { Icon } from "@/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  hasQrCode?: boolean
}

export function QRCodeSection ({ urlId, qrCode, isPending, hasQrCode }: QRCodeSectionProps) {
  const navigate = useNavigate()

  return (
    <section className="w-full mt-6 flex flex-col card px-4 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">QR Code</h2>
        {hasQrCode && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              headIcon={{ name: 'PaintRoller' }}
              onClick={() => navigate(resolvePath(paths.private.link.qrCustomize, { id: urlId }))}
            >
              Customizar
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton icon={{ name: 'Ellipsis' }} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Download</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => qrCode && downloadQrCode(qrCode, 'svg')}>
                    <Icon name="Download" />
                    SVG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => qrCode && downloadQrCode(qrCode, 'png')}>
                    <Icon name="Download" />
                    PNG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => qrCode && downloadQrCode(qrCode, 'jpg')}>
                    <Icon name="Download" />
                    JPEG
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className="mt-6">
        {!hasQrCode && !isPending ? (
          <div className="flex flex-col items-center justify-center gap-3 py-8 text-muted-foreground border border-dashed border-outline rounded-md">
            <Icon name="QrCode" size={40} className="opacity-30" />
            <p className="text-sm">Nenhum QR Code gerado para este link.</p>
            <Button
              variant="ghost"
              type="button"
              onClick={() => navigate(resolvePath(paths.private.link.qrCustomize, { id: urlId }))}
            >
              Criar QR Code
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <QRCodePreview
              src={qrCode ?? null}
              isPending={isPending}
            />
          </div>
        )}
      </div>
    </section>
  )
}
