import { AiOutlineClose } from "react-icons/ai";
import bkgrd from '../../assets/images/flyingsaucers.jpg';

const TeaModal = ({ tea, onClose }) => {
	return (
		<div
			className="fixed inset-0 bg-[#0a0a23] bg-opacity-60 z-50 flex justify-center items-center"
			onClick={onClose}
		>
			<div
				onClick={(event) => event.stopPropagation()}
				className="w-[600px] max-w-full rounded-xl overflow-hidden relative shadow-lg border border-gray-500"
				style={{
					backgroundImage: `url(${bkgrd})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backdropFilter: 'blur(10px)',
				}}
			>
				{/* Close Icon */}
				<AiOutlineClose
					className="absolute right-6 top-4 text-3xl text-white cursor-pointer hover:text-gray-300 z-20"
					onClick={onClose}
				/>

				{/* Overlay Film */}
				<div className="absolute rounded-xl inset-0 bg-gradient-to-br from-[white] to-[#170782cc]"></div>

				{/* Content Container */}
				<div className="flex flex-col justify-center items-center h-full p-8 relative z-10 text-white">
					<h1 className="text-2xl font-bold mb-2 text-center text-[#5f378d]">How to Prepare</h1>
					<h2 className="text-4xl mb-5 text-center">{tea.teaName} <span className="text-[#5f378d]"> by </span>{tea.sourceName}</h2>
					<div className="grid grid-cols-3 gap-4 text-md w-full">
						<div>
							<strong className="block text-center">Water Temperature</strong>
							<p className="text-center">{tea.brewingInfo.waterTemp.value} {tea.brewingInfo.waterTemp.unit}</p>
						</div>
						<div>
							<strong className="block text-center">Tea Amount Per Cup</strong>
							<p className="text-center">{tea.brewingInfo.teaAmountPerCup.value} {tea.brewingInfo.teaAmountPerCup.unit}</p>
						</div>
						<div>
							<strong className="block text-center">Steep Time</strong>
							<p className="text-center">{tea.brewingInfo.steepTime.value} {tea.brewingInfo.steepTime.unit}</p>
						</div>
						{tea.notes && (
							<div className="col-span-3 mt-4">
								<strong className="block text-center">Notes</strong>
								<p className="text-center">{tea.notes}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeaModal;
