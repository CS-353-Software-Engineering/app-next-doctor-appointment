import {NextPage} from "next";

const UnauthorizedPage: NextPage = () => {
	return (
		<div className="w-100 vh-100 d-flex justify-content-center align-items-center">
			<h2>You are not authorized to access this application</h2>
		</div>
	)
}

export default UnauthorizedPage