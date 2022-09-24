/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function ErrPage() {
	return (
		<div>
			<br />
			<br />
			<br />
			<section className="bg-white dark:bg-gray-900">
				<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
					<div className="mx-auto max-w-screen-sm text-center">
						<h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
							404
						</h1>
						<p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
							Something's missing.
						</p>
						<p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
							Sorry, we can't find that page. You'll find lots to explore on the home page.{" "}
						</p>
						<a
							href="/"
							className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
						>
							Back to Homepage
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
