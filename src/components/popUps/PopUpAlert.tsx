/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {cn} from '@/lib/utils'
import {memo} from 'react'

const PopUpAlert = ({
  open,
  setOpen,
  handleContinue,
  handleCancel,
  t,
  isPending = false,
  text,
}: {
  open: boolean
  setOpen: (state: boolean) => void
  t: any
  handleContinue?: () => void
  handleCancel?: () => void
  text: {
    title: string
    subTitle: string
  }
  isPending?: boolean
}) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogContent className=''>
        <AlertDialogHeader>
          <AlertDialogTitle className='xsm:text-[0.7rem]'>
            {text.title}
          </AlertDialogTitle>
          <AlertDialogDescription className='xsm:text-[0.7rem]'>
            {text.subTitle ? text.subTitle : ''}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleCancel}
            className='xsm:text-[0.6rem]'
          >
            {t.button.cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className={cn(
              'text-white px-6 pl-7 xsm:text-[0.6rem]',
              isPending && 'pointer-events-none',
            )}
            onClick={handleContinue}
          >
            {t.button.continue}
            {isPending && (
              <div className='border-white size-[1rem] rounded-[50%] border-[2px] border-r-0 border-solid text-white mr-[0.5rem] animate-spin' />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default memo(PopUpAlert)
