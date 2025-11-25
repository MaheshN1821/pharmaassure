import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { authAPI } from "../services/api";
import {
	User,
	Mail,
	Phone,
	Save,
	Shield,
	Bell,
	Palette,
	Lock,
	CheckCircle,
	Building2,
	Truck,
	Stethoscope,
	SettingsIcon,
	Sparkles,
	Moon,
	Sun,
	Monitor,
	Clock,
	Crown,
} from "lucide-react";
import toast from "react-hot-toast";

const roleIcons = {
	admin: Shield,
	warehouse: Building2,
	pharmacist: Stethoscope,
	driver: Truck,
};

const roleColors = {
	admin: "from-purple-500 to-indigo-500",
	warehouse: "from-blue-500 to-cyan-500",
	pharmacist: "from-emerald-500 to-teal-500",
	driver: "from-amber-500 to-orange-500",
};

const rolePermissions = {
	admin: [
		"Full system access",
		"User management",
		"All reports & analytics",
		"System configuration",
	],
	warehouse: [
		"Inventory management",
		"Movement creation",
		"Stock reports",
		"Batch management",
	],
	pharmacist: [
		"View inventory",
		"View movements",
		"Basic reports",
		"Drug verification",
	],
	driver: [
		"View assigned movements",
		"Update delivery status",
		"QR scanning",
		"Route information",
	],
};

export default function Settings() {
	const { user, updateUser } = useAuthStore();
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("profile");
	const [formData, setFormData] = useState({
		name: user?.name || "",
		phone: user?.phone || "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const { data } = await authAPI.updateProfile(formData);
			updateUser(data.user);
			toast.success("Profile updated successfully");
		} catch (error) {
			toast.error("Failed to update profile");
		} finally {
			setLoading(false);
		}
	};

	const RoleIcon = roleIcons[user?.role] || User;
	const roleColor = roleColors[user?.role] || "from-teal-500 to-cyan-500";

	return (
		<div className="space-y-6 animate-fade-in">
			{/* Header with gradient */}
			{/* <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 p-6 text-white">
				<div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
				<div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
				<div className="relative z-10 flex items-center gap-4">
					<div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
						<SettingsIcon className="w-7 h-7 text-white" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">Settings</h1>
						<p className="text-slate-300">
							Manage your account and preferences
						</p>
					</div>
				</div>
			</div> */}

			{/* Settings Tabs */}
			<div className="flex gap-1 p-1.5 bg-slate-100 rounded-2xl w-fit">
				{[
					{ id: "profile", label: "Profile", icon: User },
					{ id: "notifications", label: "Notifications", icon: Bell },
					{ id: "appearance", label: "Appearance", icon: Palette },
				].map((tab) => {
					const TabIcon = tab.icon;
					return (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
								activeTab === tab.id
									? "bg-white text-teal-600 shadow-md"
									: "text-slate-600 hover:text-slate-900 hover:bg-white/50"
							}`}
						>
							<TabIcon className="w-4 h-4" />
							{tab.label}
						</button>
					);
				})}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Settings Panel */}
				<div className="lg:col-span-2 space-y-6">
					{activeTab === "profile" && (
						<div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden animate-fade-in">
							<div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/25">
										<User className="w-6 h-6 text-white" />
									</div>
									<div>
										<h2 className="text-lg font-semibold text-slate-900">
											Profile Information
										</h2>
										<p className="text-sm text-slate-500">
											Update your personal details
										</p>
									</div>
								</div>
							</div>

							<form onSubmit={handleSubmit} className="p-6 space-y-6">
								{/* Profile Avatar Card */}
								<div className="relative overflow-hidden p-5 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-2xl border border-slate-200">
									<div className="flex items-center gap-5">
										<div className="relative">
											<div
												className={`w-20 h-20 bg-gradient-to-br ${roleColor} rounded-2xl flex items-center justify-center shadow-xl`}
											>
												<span className="text-3xl font-bold text-white">
													{user?.name?.charAt(0)?.toUpperCase() || "U"}
												</span>
											</div>
											<div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
												<CheckCircle className="w-4 h-4 text-white" />
											</div>
										</div>
										<div className="flex-1">
											<p className="font-bold text-slate-900 text-lg">
												{user?.name}
											</p>
											<div className="flex items-center gap-2 mt-1">
												<div
													className={`w-5 h-5 rounded-md bg-gradient-to-br ${roleColor} flex items-center justify-center`}
												>
													<RoleIcon className="w-3 h-3 text-white" />
												</div>
												<span className="text-sm text-slate-500 capitalize">
													{user?.role}
												</span>
											</div>
											<span className="inline-flex invisible items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mt-2">
												<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
												Active Account
											</span>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
									<div>
										<label className="block text-sm font-medium text-slate-700 mb-2">
											Full Name
										</label>
										<div className="relative group">
											<User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
											<input
												type="text"
												name="name"
												value={formData.name}
												onChange={handleChange}
												className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all"
											/>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 mb-2">
											Email
										</label>
										<div className="relative">
											<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
											<input
												type="email"
												value={user?.email || ""}
												className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
												disabled
											/>
										</div>
										<p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
											<Lock className="w-3 h-3" />
											Email cannot be changed
										</p>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 mb-2">
											Phone
										</label>
										<div className="relative group">
											<Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
											<input
												type="tel"
												name="phone"
												value={formData.phone}
												onChange={handleChange}
												className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all"
												placeholder="Enter phone number"
											/>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 mb-2">
											Role
										</label>
										<div className="relative">
											<Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
											<input
												type="text"
												value={user?.role || ""}
												className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 capitalize cursor-not-allowed"
												disabled
											/>
										</div>
										<p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
											<Lock className="w-3 h-3" />
											Contact admin to change role
										</p>
									</div>
								</div>

								<button
									type="submit"
									disabled={loading}
									className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg shadow-teal-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{loading ? (
										<>
											<span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
											Saving...
										</>
									) : (
										<>
											<Save className="w-5 h-5" />
											Save Changes
										</>
									)}
								</button>
							</form>
						</div>
					)}

					{activeTab === "notifications" && (
						<div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden animate-fade-in">
							<div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
										<Bell className="w-6 h-6 text-white" />
									</div>
									<div>
										<h2 className="text-lg font-semibold text-slate-900">
											Notification Preferences
										</h2>
										<p className="text-sm text-slate-500">
											Manage how you receive alerts
										</p>
									</div>
								</div>
							</div>

							<div className="p-6 space-y-4">
								{[
									{
										label: "Low Stock Alerts",
										desc: "Get notified when inventory is running low",
										default: true,
										icon: "package",
									},
									{
										label: "Expiry Warnings",
										desc: "Alerts for drugs approaching expiry date",
										default: true,
										icon: "clock",
									},
									{
										label: "Movement Updates",
										desc: "Status updates for supply chain movements",
										default: true,
										icon: "truck",
									},
									{
										label: "System Announcements",
										desc: "Important platform updates and news",
										default: false,
										icon: "sparkles",
									},
								].map((item, index) => (
									<div
										key={index}
										className="flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100 hover:border-teal-200 transition-all"
									>
										<div className="flex items-center gap-4">
											<div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
												{item.icon === "package" && (
													<Shield className="w-5 h-5 text-slate-500" />
												)}
												{item.icon === "clock" && (
													<Clock className="w-5 h-5 text-slate-500" />
												)}
												{item.icon === "truck" && (
													<Truck className="w-5 h-5 text-slate-500" />
												)}
												{item.icon === "sparkles" && (
													<Sparkles className="w-5 h-5 text-slate-500" />
												)}
											</div>
											<div>
												<p className="font-semibold text-slate-900">
													{item.label}
												</p>
												<p className="text-sm text-slate-500">{item.desc}</p>
											</div>
										</div>
										<label className="relative inline-flex items-center cursor-pointer">
											<input
												type="checkbox"
												defaultChecked={item.default}
												className="sr-only peer"
											/>
											<div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-md peer-checked:bg-teal-500"></div>
										</label>
									</div>
								))}
							</div>
						</div>
					)}

					{activeTab === "appearance" && (
						<div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden animate-fade-in">
							<div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
										<Palette className="w-6 h-6 text-white" />
									</div>
									<div>
										<h2 className="text-lg font-semibold text-slate-900">
											Appearance Settings
										</h2>
										<p className="text-sm text-slate-500">
											Customize your experience
										</p>
									</div>
								</div>
							</div>

							<div className="p-6 space-y-8">
								<div>
									<label className="block text-sm font-semibold text-slate-700 mb-4">
										Theme
									</label>
									<div className="grid grid-cols-3 gap-4">
										{[
											{
												id: "light",
												label: "Light",
												icon: Sun,
												color: "bg-gradient-to-br from-amber-50 to-orange-50",
												iconBg: "bg-amber-100",
												iconColor: "text-amber-600",
											},
											{
												id: "dark",
												label: "Dark",
												icon: Moon,
												color: "bg-gradient-to-br from-slate-700 to-slate-900",
												iconBg: "bg-slate-600",
												iconColor: "text-slate-300",
											},
											{
												id: "auto",
												label: "System",
												icon: Monitor,
												color: "bg-gradient-to-r from-slate-100 to-slate-700",
												iconBg: "bg-slate-200",
												iconColor: "text-slate-600",
											},
										].map((theme) => {
											const ThemeIcon = theme.icon;
											return (
												<button
													key={theme.id}
													className={`p-4 rounded-2xl border-2 transition-all ${
														theme.id === "light"
															? "border-teal-500 bg-white shadow-lg"
															: "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
													}`}
												>
													<div
														className={`w-full h-16 rounded-xl ${theme.color} mb-3 flex items-center justify-center`}
													>
														<div
															className={`w-10 h-10 rounded-lg ${theme.iconBg} flex items-center justify-center`}
														>
															<ThemeIcon
																className={`w-5 h-5 ${theme.iconColor}`}
															/>
														</div>
													</div>
													<p className="text-sm font-semibold text-slate-700">
														{theme.label}
													</p>
													{theme.id === "light" && (
														<span className="text-xs text-teal-600 font-medium">
															Active
														</span>
													)}
												</button>
											);
										})}
									</div>
								</div>

								<div>
									<label className="block text-sm font-semibold text-slate-700 mb-4">
										Accent Color
									</label>
									<div className="flex gap-4">
										{[
											{
												color: "bg-teal-500",
												ring: "ring-teal-500",
												active: true,
											},
											{
												color: "bg-blue-500",
												ring: "ring-blue-500",
												active: false,
											},
											{
												color: "bg-emerald-500",
												ring: "ring-emerald-500",
												active: false,
											},
											{
												color: "bg-amber-500",
												ring: "ring-amber-500",
												active: false,
											},
											{
												color: "bg-rose-500",
												ring: "ring-rose-500",
												active: false,
											},
											{
												color: "bg-violet-500",
												ring: "ring-violet-500",
												active: false,
											},
										].map((item, index) => (
											<button
												key={index}
												className={`w-12 h-12 rounded-xl ${
													item.color
												} transition-all hover:scale-110 ${
													item.active
														? `ring-2 ring-offset-4 ${item.ring}`
														: "hover:ring-2 hover:ring-offset-2 hover:ring-slate-300"
												}`}
											>
												{item.active && (
													<CheckCircle className="w-5 h-5 text-white mx-auto" />
												)}
											</button>
										))}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Account Info Sidebar */}
				<div className="space-y-6">
					<div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
						<div className="p-5 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50">
							<h2 className="font-semibold text-slate-900">Account Status</h2>
						</div>
						<div className="p-5 space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-slate-600">Status</span>
								<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
									<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
									Active
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-slate-600">Member Since</span>
								<span className="text-slate-900 font-semibold">Jan 2024</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-slate-600">Last Login</span>
								<span className="text-slate-900 font-semibold">Today</span>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
						<div
							className={`p-5 border-b border-slate-100 bg-gradient-to-r ${roleColor
								.replace("from-", "from-")
								.replace("to-", "to-")}/10`}
						>
							<div className="flex items-center gap-2">
								<Crown className="w-5 h-5 text-teal-600" />
								<h2 className="font-semibold text-slate-900">
									Role Permissions
								</h2>
							</div>
						</div>
						<div className="p-5">
							<div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
								<div
									className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColor} flex items-center justify-center`}
								>
									<RoleIcon className="w-5 h-5 text-white" />
								</div>
								<div>
									<p className="font-semibold text-slate-900 capitalize">
										{user?.role}
									</p>
									<p className="text-xs text-slate-500">Access Level</p>
								</div>
							</div>
							<div className="space-y-3">
								{rolePermissions[user?.role]?.map((permission, index) => (
									<div key={index} className="flex items-center gap-3 text-sm">
										<div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
											<CheckCircle className="w-3 h-3 text-emerald-600" />
										</div>
										<span className="text-slate-700">{permission}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// import { useState } from "react";
// import { useAuthStore } from "../store/authStore";
// import { authAPI } from "../services/api";
// import {
// 	User,
// 	Mail,
// 	Phone,
// 	Save,
// 	Shield,
// 	Bell,
// 	Palette,
// 	Lock,
// 	CheckCircle,
// 	Building2,
// 	Truck,
// 	Stethoscope,
// } from "lucide-react";
// import toast from "react-hot-toast";

// const roleIcons = {
// 	admin: Shield,
// 	warehouse: Building2,
// 	pharmacist: Stethoscope,
// 	driver: Truck,
// };

// const rolePermissions = {
// 	admin: [
// 		"Full system access",
// 		"User management",
// 		"All reports & analytics",
// 		"System configuration",
// 	],
// 	warehouse: [
// 		"Inventory management",
// 		"Movement creation",
// 		"Stock reports",
// 		"Batch management",
// 	],
// 	pharmacist: [
// 		"View inventory",
// 		"View movements",
// 		"Basic reports",
// 		"Drug verification",
// 	],
// 	driver: [
// 		"View assigned movements",
// 		"Update delivery status",
// 		"QR scanning",
// 		"Route information",
// 	],
// };

// export default function Settings() {
// 	const { user, updateUser } = useAuthStore();
// 	const [loading, setLoading] = useState(false);
// 	const [activeTab, setActiveTab] = useState("profile");
// 	const [formData, setFormData] = useState({
// 		name: user?.name || "",
// 		phone: user?.phone || "",
// 	});

// 	const handleChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setLoading(true);

// 		try {
// 			const { data } = await authAPI.updateProfile(formData);
// 			updateUser(data.user);
// 			toast.success("Profile updated successfully");
// 		} catch (error) {
// 			toast.error("Failed to update profile");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const RoleIcon = roleIcons[user?.role] || User;

// 	return (
// 		<div className="space-y-6 animate-fade-in">
// 			{/* Header */}
// 			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// 				<div>
// 					<h1 className="text-2xl font-bold text-slate-900">Settings</h1>
// 					<p className="text-slate-500">Manage your account and preferences</p>
// 				</div>
// 			</div>

// 			{/* Settings Tabs */}
// 			<div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
// 				{[
// 					{ id: "profile", label: "Profile", icon: User },
// 					{ id: "notifications", label: "Notifications", icon: Bell },
// 					{ id: "appearance", label: "Appearance", icon: Palette },
// 				].map((tab) => (
// 					<button
// 						key={tab.id}
// 						onClick={() => setActiveTab(tab.id)}
// 						className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
// 							activeTab === tab.id
// 								? "bg-white text-teal-600 shadow-sm"
// 								: "text-slate-600 hover:text-slate-900"
// 						}`}
// 					>
// 						<tab.icon className="w-4 h-4" />
// 						{tab.label}
// 					</button>
// 				))}
// 			</div>

// 			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// 				{/* Main Settings Panel */}
// 				<div className="lg:col-span-2 space-y-6">
// 					{activeTab === "profile" && (
// 						<div className="card-elevated animate-slide-in">
// 							<div className="flex items-center gap-3 mb-6">
// 								<div className="icon-box icon-box-lg bg-gradient-to-br from-teal-500 to-cyan-500">
// 									<User className="w-6 h-6 text-white" />
// 								</div>
// 								<div>
// 									<h2 className="text-lg font-semibold text-slate-900">
// 										Profile Information
// 									</h2>
// 									<p className="text-sm text-slate-500">
// 										Update your personal details
// 									</p>
// 								</div>
// 							</div>

// 							<form onSubmit={handleSubmit} className="space-y-6">
// 								{/* Profile Avatar */}
// 								<div className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
// 									<div className="relative">
// 										<div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
// 											<span className="text-2xl font-bold text-white">
// 												{user?.name?.charAt(0)?.toUpperCase() || "U"}
// 											</span>
// 										</div>
// 										<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
// 											<CheckCircle className="w-3 h-3 text-white" />
// 										</div>
// 									</div>
// 									<div>
// 										<p className="font-semibold text-slate-900">{user?.name}</p>
// 										<p className="text-sm text-slate-500 capitalize flex items-center gap-1">
// 											<RoleIcon className="w-4 h-4" />
// 											{user?.role}
// 										</p>
// 										<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mt-1">
// 											Active Account
// 										</span>
// 									</div>
// 								</div>

// 								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// 									<div>
// 										<label className="block text-sm font-medium text-slate-700 mb-2">
// 											Full Name
// 										</label>
// 										<div className="relative group">
// 											<User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
// 											<input
// 												type="text"
// 												name="name"
// 												value={formData.name}
// 												onChange={handleChange}
// 												className="input-glass pl-12"
// 											/>
// 										</div>
// 									</div>

// 									<div>
// 										<label className="block text-sm font-medium text-slate-700 mb-2">
// 											Email
// 										</label>
// 										<div className="relative">
// 											<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
// 											<input
// 												type="email"
// 												value={user?.email || ""}
// 												className="input-glass pl-12 bg-slate-50 cursor-not-allowed opacity-60"
// 												disabled
// 											/>
// 										</div>
// 										<p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
// 											<Lock className="w-3 h-3" />
// 											Email cannot be changed
// 										</p>
// 									</div>

// 									<div>
// 										<label className="block text-sm font-medium text-slate-700 mb-2">
// 											Phone
// 										</label>
// 										<div className="relative group">
// 											<Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
// 											<input
// 												type="tel"
// 												name="phone"
// 												value={formData.phone}
// 												onChange={handleChange}
// 												className="input-glass pl-12"
// 												placeholder="Enter phone number"
// 											/>
// 										</div>
// 									</div>

// 									<div>
// 										<label className="block text-sm font-medium text-slate-700 mb-2">
// 											Role
// 										</label>
// 										<div className="relative">
// 											<Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
// 											<input
// 												type="text"
// 												value={user?.role || ""}
// 												className="input-glass pl-12 bg-slate-50 cursor-not-allowed opacity-60 capitalize"
// 												disabled
// 											/>
// 										</div>
// 										<p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
// 											<Lock className="w-3 h-3" />
// 											Contact admin to change role
// 										</p>
// 									</div>
// 								</div>

// 								<button
// 									type="submit"
// 									disabled={loading}
// 									className="btn-primary"
// 								>
// 									{loading ? (
// 										<span className="flex items-center gap-2">
// 											<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
// 											Saving...
// 										</span>
// 									) : (
// 										<>
// 											<Save className="w-4 h-4" />
// 											Save Changes
// 										</>
// 									)}
// 								</button>
// 							</form>
// 						</div>
// 					)}

// 					{activeTab === "notifications" && (
// 						<div className="card-elevated animate-slide-in">
// 							<div className="flex items-center gap-3 mb-6">
// 								<div className="icon-box icon-box-lg bg-gradient-to-br from-amber-500 to-orange-500">
// 									<Bell className="w-6 h-6 text-white" />
// 								</div>
// 								<div>
// 									<h2 className="text-lg font-semibold text-slate-900">
// 										Notification Preferences
// 									</h2>
// 									<p className="text-sm text-slate-500">
// 										Manage how you receive alerts
// 									</p>
// 								</div>
// 							</div>

// 							<div className="space-y-4">
// 								{[
// 									{
// 										label: "Low Stock Alerts",
// 										desc: "Get notified when inventory is running low",
// 										default: true,
// 									},
// 									{
// 										label: "Expiry Warnings",
// 										desc: "Alerts for drugs approaching expiry date",
// 										default: true,
// 									},
// 									{
// 										label: "Movement Updates",
// 										desc: "Status updates for supply chain movements",
// 										default: true,
// 									},
// 									{
// 										label: "System Announcements",
// 										desc: "Important platform updates and news",
// 										default: false,
// 									},
// 								].map((item, index) => (
// 									<div
// 										key={index}
// 										className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
// 									>
// 										<div>
// 											<p className="font-medium text-slate-900">{item.label}</p>
// 											<p className="text-sm text-slate-500">{item.desc}</p>
// 										</div>
// 										<label className="relative inline-flex items-center cursor-pointer">
// 											<input
// 												type="checkbox"
// 												defaultChecked={item.default}
// 												className="sr-only peer"
// 											/>
// 											<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
// 										</label>
// 									</div>
// 								))}
// 							</div>
// 						</div>
// 					)}

// 					{activeTab === "appearance" && (
// 						<div className="card-elevated animate-slide-in">
// 							<div className="flex items-center gap-3 mb-6">
// 								<div className="icon-box icon-box-lg bg-gradient-to-br from-purple-500 to-pink-500">
// 									<Palette className="w-6 h-6 text-white" />
// 								</div>
// 								<div>
// 									<h2 className="text-lg font-semibold text-slate-900">
// 										Appearance Settings
// 									</h2>
// 									<p className="text-sm text-slate-500">
// 										Customize your experience
// 									</p>
// 								</div>
// 							</div>

// 							<div className="space-y-6">
// 								<div>
// 									<label className="block text-sm font-medium text-slate-700 mb-3">
// 										Theme
// 									</label>
// 									<div className="grid grid-cols-3 gap-3">
// 										{[
// 											{
// 												id: "light",
// 												label: "Light",
// 												color: "bg-white border-2 border-slate-200",
// 											},
// 											{ id: "dark", label: "Dark", color: "bg-slate-800" },
// 											{
// 												id: "auto",
// 												label: "Auto",
// 												color: "bg-gradient-to-r from-white to-slate-800",
// 											},
// 										].map((theme) => (
// 											<button
// 												key={theme.id}
// 												className={`p-4 rounded-xl border-2 transition-all ${
// 													theme.id === "light"
// 														? "border-teal-500 bg-teal-50"
// 														: "border-slate-200 hover:border-slate-300"
// 												}`}
// 											>
// 												<div
// 													className={`w-full h-8 rounded-lg ${theme.color} mb-2`}
// 												></div>
// 												<p className="text-sm font-medium text-slate-700">
// 													{theme.label}
// 												</p>
// 											</button>
// 										))}
// 									</div>
// 								</div>

// 								<div>
// 									<label className="block text-sm font-medium text-slate-700 mb-3">
// 										Accent Color
// 									</label>
// 									<div className="flex gap-3">
// 										{[
// 											{ color: "bg-teal-500", active: true },
// 											{ color: "bg-blue-500", active: false },
// 											{ color: "bg-emerald-500", active: false },
// 											{ color: "bg-amber-500", active: false },
// 											{ color: "bg-rose-500", active: false },
// 										].map((item, index) => (
// 											<button
// 												key={index}
// 												className={`w-10 h-10 rounded-xl ${
// 													item.color
// 												} transition-all ${
// 													item.active
// 														? "ring-2 ring-offset-2 ring-teal-500"
// 														: "hover:scale-110"
// 												}`}
// 											></button>
// 										))}
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					)}
// 				</div>

// 				{/* Account Info Sidebar */}
// 				<div className="space-y-6">
// 					<div
// 						className="card-elevated animate-slide-in"
// 						style={{ animationDelay: "0.1s" }}
// 					>
// 						<h2 className="text-lg font-semibold text-slate-900 mb-4">
// 							Account Status
// 						</h2>
// 						<div className="space-y-4">
// 							<div className="flex items-center justify-between">
// 								<span className="text-slate-600">Status</span>
// 								<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
// 									<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
// 									Active
// 								</span>
// 							</div>
// 							<div className="flex items-center justify-between">
// 								<span className="text-slate-600">Member Since</span>
// 								<span className="text-slate-900 font-medium">Jan 2024</span>
// 							</div>
// 						</div>
// 					</div>

// 					<div
// 						className="card-elevated animate-slide-in"
// 						style={{ animationDelay: "0.2s" }}
// 					>
// 						<div className="flex items-center gap-2 mb-4">
// 							<RoleIcon className="w-5 h-5 text-teal-600" />
// 							<h2 className="text-lg font-semibold text-slate-900">
// 								Role Permissions
// 							</h2>
// 						</div>
// 						<p className="text-sm text-slate-500 mb-4 capitalize">
// 							{user?.role} Access Level
// 						</p>
// 						<div className="space-y-2">
// 							{rolePermissions[user?.role]?.map((permission, index) => (
// 								<div
// 									key={index}
// 									className="flex items-center gap-2 text-sm text-slate-700"
// 								>
// 									<CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
// 									<span>{permission}</span>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

//above correct

// "use client"

// import { useState } from "react"
// import { useAuthStore } from "../store/authStore"
// import { authAPI } from "../services/api"
// import { User, Mail, Phone, Save, Shield } from "lucide-react"
// import toast from "react-hot-toast"

// export default function Settings() {
//   const { user, updateUser } = useAuthStore()
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     name: user?.name || "",
//     phone: user?.phone || "",
//   })

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const { data } = await authAPI.updateProfile(formData)
//       updateUser(data.user)
//       toast.success("Profile updated successfully")
//     } catch (error) {
//       toast.error("Failed to update profile")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
//         <p className="text-slate-500">Manage your account settings</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Profile Settings */}
//         <div className="lg:col-span-2 card">
//           <h2 className="text-lg font-semibold text-slate-900 mb-6">Profile Information</h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
//               <div className="flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full">
//                 <User className="w-8 h-8" />
//               </div>
//               <div>
//                 <p className="font-semibold text-slate-900">{user?.name}</p>
//                 <p className="text-sm text-slate-500 capitalize">{user?.role}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="label">Full Name</label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="input pl-10"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="label">Email</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input type="email" value={user?.email || ""} className="input pl-10 bg-slate-50" disabled />
//                 </div>
//                 <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
//               </div>

//               <div>
//                 <label className="label">Phone</label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="input pl-10"
//                     placeholder="Enter phone number"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="label">Role</label>
//                 <div className="relative">
//                   <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input type="text" value={user?.role || ""} className="input pl-10 bg-slate-50 capitalize" disabled />
//                 </div>
//                 <p className="text-xs text-slate-500 mt-1">Contact admin to change role</p>
//               </div>
//             </div>

//             <button type="submit" disabled={loading} className="btn btn-primary">
//               <Save className="w-4 h-4" />
//               {loading ? "Saving..." : "Save Changes"}
//             </button>
//           </form>
//         </div>

//         {/* Account Info */}
//         <div className="card h-fit">
//           <h2 className="text-lg font-semibold text-slate-900 mb-4">Account Information</h2>
//           <div className="space-y-4">
//             <div>
//               <p className="text-sm text-slate-500">Account Status</p>
//               <span className="badge badge-success">Active</span>
//             </div>
//             <div>
//               <p className="text-sm text-slate-500">Role Permissions</p>
//               <div className="mt-2 space-y-1">
//                 {user?.role === "admin" && (
//                   <>
//                     <p className="text-sm text-slate-700">- Full system access</p>
//                     <p className="text-sm text-slate-700">- User management</p>
//                     <p className="text-sm text-slate-700">- All reports</p>
//                   </>
//                 )}
//                 {user?.role === "warehouse" && (
//                   <>
//                     <p className="text-sm text-slate-700">- Inventory management</p>
//                     <p className="text-sm text-slate-700">- Movement creation</p>
//                     <p className="text-sm text-slate-700">- Stock reports</p>
//                   </>
//                 )}
//                 {user?.role === "pharmacist" && (
//                   <>
//                     <p className="text-sm text-slate-700">- View inventory</p>
//                     <p className="text-sm text-slate-700">- View movements</p>
//                     <p className="text-sm text-slate-700">- Basic reports</p>
//                   </>
//                 )}
//                 {user?.role === "driver" && (
//                   <>
//                     <p className="text-sm text-slate-700">- View assigned movements</p>
//                     <p className="text-sm text-slate-700">- Update delivery status</p>
//                     <p className="text-sm text-slate-700">- QR scanning</p>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
