import * as DialogPrimitive from '@radix-ui/react-dialog';
import { HiOutlineXMark } from 'react-icons/hi2';
import TweetForm from '../TweetForm';

const DialogDemo = () => (
	<DialogPrimitive.Root>
		<DialogPrimitive.Trigger asChild>
			<div id="dialog-trigger" className="hidden">
				<span>Open Tweet Dialog</span>
			</div>
		</DialogPrimitive.Trigger>
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay className="DialogOverlay bg-slate-900/50 fixed inset-0 z-30" />
			<DialogPrimitive.Content className="DialogContent bg-white px-4 pt-4 pb-6 -translate-x-2/4 -translate-y-2/4 rounded-2xl shadow-xl fixed z-40 top-1/2 left-1/2 w-[90vw] max-w-lg max-h-[85vh] focus:outline-none">
				<DialogPrimitive.Close asChild className="mb-4">
					<button
						className="IconButton hover:bg-slate-200 rounded-full"
						aria-label="Close"
					>
						<HiOutlineXMark className="h-5 w-5" />
					</button>
				</DialogPrimitive.Close>
				<DialogPrimitive.Title className="DialogTitle sr-only">
					Post
				</DialogPrimitive.Title>
				<DialogPrimitive.Description className="DialogDescription sr-only">
					Create a post
				</DialogPrimitive.Description>

				<TweetForm width="full" />

				{/* <DialogPrimitive.Close asChild>
          <button className="Button green">Save changes</button>
        </DialogPrimitive.Close> */}
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	</DialogPrimitive.Root>
);

export default DialogDemo;
