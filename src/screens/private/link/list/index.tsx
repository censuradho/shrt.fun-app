import { TextField } from "@/components/form/TextField";
import { LinkButton } from "@/components/LinkButton";
import { Spinner } from "@/components/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { paths } from "@/constants/routes";
import { LinkListItem } from "./components/LinkListItem";
import { ToolsMenu } from "./components/ToolsMenu";
import { useLinkListViewModel } from "./hooks/useLinkListViewModel";
import { LinkItemRich } from "./components/LinkItemRich";
import { LinkGrid } from "./components/LinkGrid";
import { cn } from "@/lib/utils";
import { ShareLinkDialog } from "./components/ShareLinkDialog";
import type { LinkMenuProps } from "./components/LinkMenu";
import { useQueryClient } from "@tanstack/react-query";
import { LinearProgress } from "@/components/LinearProgress";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { resolvePath } from "@/utils/resolvePath";
import { toastyComingSoon } from "@/utils/toastyComingSoon";

export function LinkListScreen () {
  const navigate = useNavigate()
  
  const { 
    sentinelRef, 
    links, 
    urlSelected, 
    toggleUrlSelected, 
    hasNextPage,
    search,
    setSearch,
    isPending,
    isFetched,
    isEmpty,
    isSearchValid,
    isTogglingLinkActive,
    isSelectedAll,
    handleToggleAllLinks,
    view, 
    setView,
    sharing, 
    setSharing,
    handleChangeQueries,
    queries,
    toggleLinkIsActive
  } = useLinkListViewModel()
  const queryClient = useQueryClient()

  const renderUrls = links?.pages?.flatMap(page => (
    page.data?.data.map(link => {
      const menu: LinkMenuProps = {
        onShare: () => setSharing({ shortUrl: link.shortUrl, id: link.id }),
        onToggleActive: () => toggleLinkIsActive(link.id),
        onDelete: toastyComingSoon, 
        onEdit: toastyComingSoon, 
        onViewQrCode: toastyComingSoon, 
        onDetails: toastyComingSoon,
        isActive: link.isActive
      }

      return  (
        <li
          key={link.id}
          className="overflow-hidden w-full"
        >
          <div className="hidden lg:block">
            {view === 'richList' && (
              <LinkItemRich
                data={link}
                selected={urlSelected.includes(link.id)}
                onSelect={() => toggleUrlSelected(link.id)}
                menu={menu}
              />
            )}
            {view === 'list' && (
              <LinkListItem
                data={link}
                selected={urlSelected.includes(link.id)}
                onSelect={() => toggleUrlSelected(link.id)}
                menu={menu}
              />
            )}
            {view === 'grid' && (
              <LinkGrid
                data={link}
                selected={urlSelected.includes(link.id)}
                onSelect={() => toggleUrlSelected(link.id)}
                menu={menu}
              />
            )}
          </div>
          <div className="lg:hidden">
            <LinkGrid
              data={link}
              menu={menu}
              selected={urlSelected.includes(link.id)}
              onSelect={() => toggleUrlSelected(link.id)}
            />
          </div>
        </li>
      )
    })
  ))

  return (
    <>
      <ShareLinkDialog 
        onOpenChange={() => setSharing(null)}
        open={!!sharing}
        shortUrl={sharing?.shortUrl || ''}
      />
      <div className="container mt-10 ">
        <header className="border-b border-outline flex flex-col gap-6 relative">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Meus links</h1>
            <LinkButton to={paths.private.link.create}>Criar link</LinkButton>
          </div>
          <div className="w-full max-w-100 pb-4">
            <TextField
              id="search"
              name="search"
              placeholder="Buscar links"
              label="Buscar links"
              renderLabel={false}
              headIcon={{
                name: 'Search'
              }}
              value={search}
              onChange={e => setSearch(e.target.value)}
              errorMessage={!isSearchValid ? 'URL inválida' : undefined}
            />
          </div>
          {(isTogglingLinkActive || isPending) && <LinearProgress  className="absolute bottom-0 left-0"/>}
        </header>
        <ToolsMenu 
          onSelectAll={handleToggleAllLinks}
          isSelectedAll={isSelectedAll}
          onToggleView={setView}
          view={view}
          selectedCount={urlSelected.length}
          isActive={queries.isActive}
          onChangeIsActive={(value) => {
            handleChangeQueries('isActive', value)
            queryClient.invalidateQueries({ queryKey: ['links', queries] })
          }}
        />
        <section className="mt-6 w-full flex-1 h-ful">
          {!isFetched && (
            <div className="flex flex-col gap-1">
              <Skeleton className="h-[84px] w-full rounded-md" />
              <Skeleton className="h-[84px] w-full rounded-md" />
              <Skeleton className="h-[84px] w-full rounded-md" />
            </div>
          )}
          {isEmpty && isFetched && (
            <div className="flex flex-col items-center gap-4 h-40 mt-40">
              <span className="text-[56px]">📂</span>
              <p className="text-sm">Nenhum link foi encontrado</p>
            </div>
          )}
          <ul className={cn(
            {
              'flex flex-col gap-1 w-full': view !== 'grid',
              'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4': view === 'grid'
            }
          )}>
            {renderUrls}
          </ul>
          {isPending && isFetched && (
            <div className="h-4 flex items-center justify-center py-8">
              <Spinner size={32} />
            </div>
          )}
          <div ref={sentinelRef} className="w-full">
            {!hasNextPage && isFetched && !isEmpty && (
              <div className="py-6 flex items-center gap-4 justify-center">
                <hr className="border border-outline w-10 lg:w-30" />
                <span className="text-sm whitespace-nowrap">Você chegou ao fim dos seus links</span>
                <hr className="border border-outline w-10 lg:w-30" />
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}