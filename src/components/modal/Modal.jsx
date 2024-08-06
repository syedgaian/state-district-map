import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("modal-open");
		} else {
			document.body.classList.remove("modal-open");
		}
		return () => {
			document.body.classList.remove("modal-open");
		};
	}, [isOpen]);

	const handleBackgroundClick = (event) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	function getRandomNumber(min = 70, max = 100) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10"
			onClick={handleBackgroundClick}
		>
			<div
				className="relative w-3/5 h-[95%] bg-white rounded-lg shadow-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 transform hover:scale-125 transition duration-300 ease-in-out"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</button>
				<div className="h-full flex flex-col">
					<div className="w-full  p-4 flex flex-row justify-evenly gap-2">
						<div className="w-1/2 h-full">
							<p className="text-base font-bold text-center">
								True Color Image
							</p>
							<img
								src="/modalImage.png"
								alt="Modal Image"
								className="w-full rounded-lg"
							/>
						</div>
						<div className="w-1/2 h-full">
							<p className="text-base font-bold text-center">
								NDVI Image
							</p>
							<img
								src="/modalImage.png"
								alt="Modal Image"
								className="w-full rounded-lg"
							/>
						</div>
					</div>
					<div className="w-full p-4 overflow-y-auto">
						<h2 className="text-xl font-bold text-center pb-2">
							Crop Details
						</h2>
						<div className="w-full flex flex-row justify-evenly p-4 gap-2">
							<ul className="space-y-2">
								<li>
									<p className="mt-1">
										<strong className="text-gray-800">
											NDVI_Min:{" "}
										</strong>
										<i className="text-gray-600">
											0.015251798555254936
										</i>
									</p>
								</li>
								<li>
									<p className="mt-1">
										<strong className="text-gray-800">
											NDVI_Max:{" "}
										</strong>
										<i className="text-gray-600">
											0.015251798555254936
										</i>
									</p>
								</li>
								<li>
									<p className="mt-1">
										<strong className="text-gray-800">
											NDVI_Mean:{" "}
										</strong>
										<i className="text-gray-600">
											0.015251798555254936
										</i>
									</p>
								</li>
								<li>
									<p className="mt-1">
										<strong className="text-gray-800">
											StDev:{" "}
										</strong>
										<i className="text-gray-600">0</i>
									</p>
								</li>
								{/* <li>
                  <p className="mt-1">
                    <strong className="text-gray-800">Sample Count: </strong>
                    <i className="text-gray-600">1</i>
                  </p>
                </li> */}
							</ul>
							<ul className="space-y-2">
								<li>
									<p className="mt-1">
										<strong className="text-gray-800">
											Yield in Tons:{" "}
										</strong>
										<i className="text-gray-600">1.51</i>
									</p>
								</li>
								<li>
									<p className="mt-1">
										<strong className="text-gray-800">
											Moisture Content in Percentage:{" "}
										</strong>
										<i className="text-gray-600">13</i>
									</p>
								</li>
								<li>
									<p className="mt-1">
										<strong className="text-gray-800">
											Cultivated Land:{" "}
										</strong>
										<i className="text-gray-600">
											{getRandomNumber()}%
										</i>
									</p>
								</li>
								<li>
									<p className="mt-1">
										<strong className="text-gray-800">
											Age of Crop in Months:{" "}
										</strong>
										<i className="text-gray-600">7</i>
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
