import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
const DialogContentCommon = (props: any) => {
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle >{props?.title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {props?.des}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className={"bg-red-400 text-white"}>Yes, log me out</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}
export default DialogContentCommon