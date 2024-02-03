import React, { useEffect, useState } from "react";
import axios from "axios";
import M from "materialize-css";
import "./Application.css";
import TrafficLights from "../TrafficLights/TrafficLights";
import { BackEndUploadURL, BackEndSetURL } from "../StaticInformation/UrlLinkInfo";
import { Set1Images, Set2Images } from "../StaticInformation/ImagesInfo";
const Application = (props) => {
	useEffect(() => {
		let modal = document.querySelector(".modal");
		M.Modal.init(modal, {});
	}, []);
	const [filesUpload, SetFilesUpload] = useState({
		Lane1: "",
		Lane2: "",
		Lane3: "",
		Lane4: "",
		Ref: "",
	});
	const [setNo, SetSetNo] = useState(0);
	const [signalTime, SetSignalTime] = useState({
		lane1Time: 0,
		lane2Time: 0,
		lane3Time: 0,
		lane4Time: 0,
		response: null,
	});
	const handleSelectSet = (e) => {
		if (e.target.id.includes("ImageSet1")) {
			SetSetNo(1);
			SetFilesUpload({
				Lane1: { name: "Images/set1_Lane1.jpg" },
				Lane2: { name: "Images/set1_Lane2.jpg" },
				Lane3: { name: "Images/set1_Lane3.jpg" },
				Lane4: { name: "Images/set1_Lane4.jpg" },
				Ref: { name: "Images/set1_Ref.jpg" },
			});
		} else if (e.target.id.includes("ImageSet2")) {
			SetSetNo(2);

			SetFilesUpload({
				Lane1: { name: "Images/set2_Lane1.jpg" },
				Lane2: { name: "Images/set2_Lane2.jpg" },
				Lane3: { name: "Images/set2_Lane3.jpg" },
				Lane4: { name: "Images/set2_Lane4.jpg" },
				Ref: { name: "Images/set2_Ref.jpg" },
			});
		}
	};
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		console.log(filesUpload);
		console.log(setNo);

		if (setNo === 0) {
			const formData = new FormData();
			Object.keys(filesUpload).forEach((inputName) => {
				if (filesUpload[inputName]) {
					formData.append(inputName, filesUpload[inputName]);
				}
			});
			let laneImages = {
				method: "post",
				"Content-Type": "multipart/form-data",
				url: BackEndUploadURL,
				data: formData,
			};
			await axios(laneImages).then(
				(res) => {
					if (res.data) {
						console.log(res.data);
						SetSignalTime({
							lane1Time: res.data.lane1Time,
							lane2Time: res.data.lane2Time,
							lane3Time: res.data.lane3Time,
							lane4Time: res.data.lane4Time,
							response: true,
						});
					}
				},
				(error) => console.log(error)
			);
		} else {
			let laneImages = {
				method: "post",
				"Content-Type": "multipart/form-data",
				url: BackEndSetURL,
				data: { SetNo: setNo },
			};
			await axios(laneImages).then(
				(res) => {
					if (res.data) {
						console.log(res.data);
						SetSignalTime({
							lane1Time: res.data.lane1Time,
							lane2Time: res.data.lane2Time,
							lane3Time: res.data.lane3Time,
							lane4Time: res.data.lane4Time,
							response: true,
						});
					}
				},
				(error) => console.log(error)
			);
		}
	};

	const handleFileUpload = (e) => {
		SetFilesUpload({ ...filesUpload, [e.target.id]: e.target.files[0] });
		SetSetNo(0);
	};

	const Set1ImagesDisplay = [];
	const Set2ImagesDisplay = [];
	Set1Images.forEach((img, key) => {
		Set1ImagesDisplay.push(
			<div className=" col s12 m6" key={"set1" + key} id={img.path}>
				<img
					className="responsive-img"
					src={img.path}
					alt={img.name}
					id={img.path + "img"}
				/>
				{img.name}
			</div>
		);
	});

	Set2Images.forEach((img, key) => {
		Set2ImagesDisplay.push(
			<div className="col s12 m6" key={"set2" + key} id={img.path}>
				<img
					className="responsive-img"
					src={img.path}
					alt={img.name}
					id={img.path + "img"}
				/>
				{img.name}
			</div>
		);
	});

	return (
		<div className="application">
			<div className="container">
				<h5 className="form-desc center">Upload images and see the magic</h5>
				<form id="form" className="" onSubmit={handleFormSubmit}>
					<div className="row">
						<div className="col s12 m6">
							<div className="input-field file-field">
								<div className="btn">
									<span>Browse</span>
									<input
										type="file"
										id="Lane1"
										name="Lane1"
										onChange={handleFileUpload}
									/>
								</div>
								<div className="file-path-wrapper">
									<input
										className="file-path white-text"
										type="text"
										placeholder="Lane1 Image"
										id="Lane1_Imagepath"
										name="Lane1_Imagepath"
										value={filesUpload.Lane1.name}
									/>
								</div>
							</div>
						</div>
						<div className="col s12 m6">
							<div className="input-field file-field">
								<div className="btn">
									<span>Browse</span>
									<input
										type="file"
										id="Lane2"
										name="Lane2"
										onChange={handleFileUpload}
									/>
								</div>
								<div className="file-path-wrapper">
									<input
										className="file-path white-text"
										type="text"
										placeholder="Lane2 Image"
										id="Lane2_Imagepath"
										name="Lane2_Imagepath"
										value={filesUpload.Lane2.name}
									/>
								</div>
							</div>
						</div>
						<div className="col s12 m6">
							<div className="input-field file-field">
								<div className="btn">
									<span>Browse</span>
									<input
										type="file"
										id="Lane3"
										name="Lane3"
										onChange={handleFileUpload}
									/>
								</div>
								<div className="file-path-wrapper">
									<input
										className="file-path white-text"
										type="text"
										placeholder="Lane3 Image"
										id="Lane3_Imagepath"
										name="Lane3_Imagepath"
										value={filesUpload.Lane3.name}
									/>
								</div>
							</div>
						</div>
						<div className="col s12 m6">
							<div className="input-field file-field">
								<div className="btn">
									<span>Browse</span>
									<input
										type="file"
										id="Lane4"
										name="Lane4"
										onChange={handleFileUpload}
									/>
								</div>
								<div className="file-path-wrapper">
									<input
										className="file-path white-text"
										type="text"
										placeholder="Lane4 Image"
										id="Lane4_Imagepath"
										name="Lane4_Imagepath"
										value={filesUpload.Lane4.name}
									/>
								</div>
							</div>
						</div>
						<div className="col s12 m6">
							<div className="input-field file-field">
								<div className="btn">
									<span>Browse</span>
									<input
										type="file"
										id="Ref"
										name="Ref"
										onChange={handleFileUpload}
									/>
								</div>
								<div className="file-path-wrapper">
									<input
										className="file-path  white-text"
										type="text"
										placeholder="Refernce Image"
										id="Ref_Imagepath"
										name="Ref_Imagepath"
										value={filesUpload.Ref.name}
									/>
								</div>
							</div>
						</div>
						<div className="col s12 m6">
							<div className="row">
								<div className="col s12 m6">
									<h6>
										<b>Don't have images! No worries I got your back </b>
									</h6>
									<div className="divider"></div>
								</div>
								<div className="col s12 m6">
									<button
										data-target="showImages"
										className="btn-large modal-trigger">
										Select Images
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="center">
						<button className="btn-large" onClick={handleFormSubmit}>
							Submit
							<i className="material-icons right">send</i>
						</button>
					</div>
				</form>

				<div id="showImages" className="modal  grey darken-3">
					<div className="modal-content ">
						<div className="row center">
							<div className="col s12 m6">
								<h6>
									<b>Set1 </b>
								</h6>
								<a
									className="row modal-close"
									id="set1Images"
									onClick={handleSelectSet}
									href="#!">
									{Set1ImagesDisplay}
								</a>
							</div>
							<div className="col s12 m6">
								<h6>
									<b>Set2 </b>
								</h6>
								<a
									className="row modal-close"
									id="set2Images"
									onClick={handleSelectSet}
									href="#!">
									{Set2ImagesDisplay}
								</a>
							</div>
						</div>
					</div>
					<div className="modal-footer grey darken-3">
						<a href="#!" className="modal-close btn">
							close
						</a>
					</div>
				</div>

				{signalTime.response !== null && (
					<TrafficLights signalTime={signalTime}></TrafficLights>
				)}
			</div>
		</div>
	);
};

export default Application;
