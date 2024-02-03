import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { Lights } from "../StaticInformation/ImagesInfo";
import "./TrafficLights.css";
const TrafficLights = (props) => {
	const { signalTime } = props;
	const Sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	const [timer, ChangeTimer] = useState(signalTime.lane1Time);
	const [startTimer, SetStartTimer] = useState(true);
	const [greenLane, SetGreenLane] = useState(1);

	const [lane1, SetLane1] = useState({
		time: signalTime.lane1Time,
		light: Lights.Red,
		color: "Red",
	});
	const [lane2, SetLane2] = useState({
		time: signalTime.lane2Time,
		light: Lights.Red,
		color: "Red",
	});
	const [lane3, SetLane3] = useState({
		time: signalTime.lane3Time,
		light: Lights.Red,
		color: "Red",
	});
	const [lane4, SetLane4] = useState({
		time: signalTime.lane4Time,
		light: Lights.Red,
		color: "Red",
	});
	useEffect(() => {
		async function TimeLeft() {
			await Sleep(1000);
			if (greenLane === 1) {
				if (startTimer) {
					if (timer - 1 === -1) {
						SetStartTimer(false);
					} else {
						ChangeTimer(timer - 1);
						SetLane1({ ...lane1, time: timer, light: Lights.Green, color: "Green" });
					}
				} else {
					SetLane1({ ...lane1, time: 0, light: Lights.Yellow, color: "Yellow" });
				}
				if (lane1.color === "Yellow") {
					TimeLeft(3500);
					SetLane1({ ...lane1, light: Lights.Red, color: "Red" });
					ChangeTimer(lane2.time);
					SetGreenLane(2);
					SetStartTimer(true);
				}
			} else if (greenLane === 2) {
				if (startTimer) {
					if (timer - 1 === -1) {
						SetStartTimer(false);
					} else {
						ChangeTimer(timer - 1);
						SetLane2({ ...lane2, time: timer, light: Lights.Green, color: "Green" });
					}
				} else {
					SetLane2({ ...lane2, time: 0, light: Lights.Yellow, color: "Yellow" });
				}
				if (lane2.color === "Yellow") {
					TimeLeft(3500);
					SetLane2({ ...lane2, light: Lights.Red, color: "Red" });
					ChangeTimer(lane3.time);
					SetGreenLane(3);
					SetStartTimer(true);
				}
			} else if (greenLane === 3) {
				if (startTimer) {
					if (timer - 1 === -1) {
						SetStartTimer(false);
					} else {
						ChangeTimer(timer - 1);
						SetLane3({ ...lane3, time: timer, light: Lights.Green, color: "Green" });
					}
				} else {
					SetLane3({ ...lane3, time: 0, light: Lights.Yellow, color: "Yellow" });
				}
				if (lane3.color === "Yellow") {
					TimeLeft(3500);
					SetLane3({ ...lane3, light: Lights.Red, color: "Red" });
					ChangeTimer(lane4.time);
					SetGreenLane(4);
					SetStartTimer(true);
				}
			} else if (greenLane === 4) {
				if (startTimer) {
					if (timer - 1 === -1) {
						SetStartTimer(false);
					} else {
						ChangeTimer(timer - 1);
						SetLane4({ ...lane4, time: timer, light: Lights.Green, color: "Green" });
					}
				} else {
					SetLane4({ ...lane4, time: 0, light: Lights.Yellow, color: "Yellow" });
				}
				if (lane4.color === "Yellow") {
					TimeLeft(3500);
					SetLane4({ ...lane4, light: Lights.Red, color: "Red" });
					ChangeTimer(0);
					SetGreenLane(null);
					SetStartTimer(true);
				}
			}
		}
		TimeLeft();
	}, [timer, startTimer, greenLane, lane1, lane2, lane3, lane4]);
	return (
		<div className="container row">
			<div className="col s12 m3 center">
				<p>
					<b>Lane1</b>
				</p>
				<img src={lane1.light} alt={lane1.color} />
				<p>
					<b>Time Left: {lane1.time} secs</b>
				</p>
			</div>
			<div className="col s12 m3 center">
				<p>
					<b>Lane2</b>
				</p>
				<img src={lane2.light} alt={lane2.color} />
				<p>
					<b>Time Left: {lane2.time} secs</b>
				</p>
			</div>
			<div className="col s12 m3 center">
				<p>
					<b>Lane3</b>
				</p>
				<img src={lane3.light} alt={lane3.color} />
				<p>
					<b>Time Left: {lane3.time} secs</b>
				</p>
			</div>
			<div className="col s12 m3 center">
				<p>
					<b>Lane4</b>
				</p>
				<img src={lane4.light} alt={lane4.color} />
				<p>
					<b>Time Left: {lane4.time} secs</b>
				</p>
			</div>
		</div>
	);
};

export default TrafficLights;
