import React from "react";
import { Icon, ic } from "../icons";

export default function Comms({
    patients,
    activePtId,
    setActivePtId,
    comms,
    commMode,
    setCommMode,
    chatMsg,
    setChatMsg,
    sendMsg,
    callActive,
    setCallActive,
    doctorData,
    chatEndRef,
}) {
    const pt = patients.find((x) => x.id === activePtId);

    return (
        <div className="flex gap-4 h-[calc(100vh-120px)] sm:h-[calc(100vh-148px)]">
            {}
            <div className={`w-full lg:w-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex-col shrink-0 transition-colors shadow-sm ${activePtId ? "hidden lg:flex" : "flex"}`}>
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-800 dark:text-white mb-2">
                        Conversations
                    </p>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-3 py-2 border border-slate-100 dark:border-slate-700 transition-colors">
                        <Icon
                            path={ic.search}
                            size={13}
                            className="text-slate-400 dark:text-slate-500"
                        />
                        <input
                            className="bg-transparent text-xs flex-1 outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                            placeholder="Search patient…"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-auto p-2 space-y-1">
                    {patients
                        .filter((p) => p.status === "approved")
                        .map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setActivePtId(p.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${activePtId === p.id
                                    ? "bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800/50"
                                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent"
                                    }`}
                            >
                                <div className="w-9 h-9 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-700 dark:text-green-500 font-bold text-xs shrink-0">
                                    {p.avatar}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                                        {p.name}
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                                        {comms[p.id]?.msgs?.slice(-1)[0]?.text || "No messages"}
                                    </p>
                                </div>
                                {(comms[p.id]?.msgs || []).length > 0 && (
                                    <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                )}
                            </button>
                        ))}
                </div>
            </div>

            {}
            <div className={`flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex-col min-w-0 transition-colors shadow-sm ${!activePtId ? "hidden lg:flex" : "flex"}`}>
                {!pt ? (
                    <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
                        Select a patient
                    </div>
                ) : (
                    <>
                        {}
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setActivePtId(null)}
                                    className="lg:hidden p-1.5 -ml-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                                >
                                    <Icon path={ic.arrowLeft} size={20} />
                                </button>
                                <div className="w-9 h-9 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-700 dark:text-green-500 font-bold text-sm shadow-sm shrink-0">
                                    {pt.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-white text-sm">
                                        {pt.name}
                                    </p>
                                    <p className="text-xs text-green-600 dark:text-green-500 flex items-center gap-1 font-medium">
                                        <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full inline-block shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            {}
                            <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl p-1 gap-1 border border-slate-100 dark:border-slate-700 transition-colors">
                                {[
                                    ["chat", ic.chat, "Message"],
                                    ["voice", ic.phone, "Voice"],
                                    ["video", ic.video, "Video"],
                                ].map(([mode, icon, label]) => (
                                    <button
                                        key={mode}
                                        onClick={() => {
                                            setCommMode(mode);
                                            setCallActive(false);
                                        }}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${commMode === mode
                                            ? "bg-white dark:bg-slate-700 shadow shadow-slate-200 dark:shadow-slate-900 text-green-700 dark:text-green-400 border border-slate-100 dark:border-slate-600"
                                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-transparent"
                                            }`}
                                    >
                                        <Icon path={icon} size={13} />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {}
                        {commMode === "chat" && (
                            <>
                                <div className="flex-1 overflow-auto p-4 space-y-3">
                                    {(comms[activePtId]?.msgs || []).map((m, i) => (
                                        <div
                                            key={i}
                                            className={`flex ${m.from === "doctor" ? "justify-end" : "justify-start"
                                                }`}
                                        >
                                            <div
                                                className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm shadow-sm ${m.from === "doctor"
                                                    ? "bg-green-600 text-white rounded-br-sm"
                                                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm"
                                                    }`}
                                            >
                                                <p className="text-sm">{m.text}</p>
                                                <p
                                                    className={`text-xs mt-1 ${m.from === "doctor"
                                                        ? "text-green-200"
                                                        : "text-slate-400 dark:text-slate-500"
                                                        }`}
                                                >
                                                    {m.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>
                                <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                    <input
                                        className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500 dark:text-white transition-colors placeholder-slate-400 dark:placeholder-slate-500"
                                        placeholder="Type a message…"
                                        value={chatMsg}
                                        onChange={(e) => setChatMsg(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                                    />
                                    <button
                                        onClick={sendMsg}
                                        className="w-10 h-10 bg-green-600 text-white rounded-xl flex items-center justify-center hover:bg-green-700 shrink-0 transition-colors shadow-sm"
                                    >
                                        <Icon path={ic.send} size={15} />
                                    </button>
                                </div>
                            </>
                        )}

                        {}
                        {commMode === "voice" && (
                            <div className="flex-1 flex flex-col">
                                <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
                                    {callActive ? (
                                        <>
                                            <div className="relative">
                                                <div className="w-28 h-28 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 font-bold text-4xl shadow-lg">
                                                    {pt.avatar}
                                                </div>
                                                <div className="absolute inset-0 rounded-full border-4 border-green-200 dark:border-green-600 animate-ping opacity-40" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-slate-800 dark:text-white text-xl">
                                                    {pt.name}
                                                </p>
                                                <p className="text-green-600 dark:text-green-400 text-sm font-medium mt-1 flex items-center gap-1 justify-center">
                                                    <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full inline-block shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                                    Connected · 00:42
                                                </p>
                                            </div>
                                            <div className="flex gap-4 mt-2">
                                                {[
                                                    [ic.mic, "Mute", "slate"],
                                                    [ic.endcall, "End", "red"],
                                                    [ic.mic, "Speaker", "slate"],
                                                ].map(([icon, label, c]) => (
                                                    <button
                                                        key={label}
                                                        onClick={() => {
                                                            if (label === "End") setCallActive(false);
                                                        }}
                                                        className={`flex flex-col items-center gap-1.5 w-16 h-16 rounded-2xl justify-center transition-all shadow-sm ${c === "red"
                                                            ? "bg-red-500 text-white hover:bg-red-600"
                                                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                                            }`}
                                                    >
                                                        <Icon path={icon} size={18} />
                                                        <span className="text-xs font-medium">{label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 font-bold text-3xl shadow-sm">
                                                {pt.avatar}
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-slate-800 dark:text-white text-xl">
                                                    {pt.name}
                                                </p>
                                                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
                                                    {pt.phone}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setCallActive(true)}
                                                className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-green-700 transition-all shadow-md mt-2"
                                            >
                                                <Icon path={ic.phone} size={18} />
                                                Start Voice Call
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div className="border-t border-slate-100 dark:border-slate-800 p-4">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                                        Voice Call History
                                    </p>
                                    <div className="space-y-2">
                                        {(comms[activePtId]?.calls || [])
                                            .filter((c) => c.type === "voice")
                                            .map((c, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-xl px-3 py-2 transition-colors"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                                            <Icon
                                                                path={ic.phone}
                                                                size={13}
                                                                className="text-green-600 dark:text-green-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                                Voice Call
                                                            </p>
                                                            <p className="text-xs text-slate-400 dark:text-slate-500">
                                                                {c.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                                        {c.duration}
                                                    </span>
                                                </div>
                                            ))}
                                        {!(comms[activePtId]?.calls || []).some(
                                            (c) => c.type === "voice"
                                        ) && (
                                                <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                                                    No voice calls yet
                                                </p>
                                            )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {}
                        {commMode === "video" && (
                            <div className="flex-1 flex flex-col">
                                <div className="flex-1 bg-slate-900 border border-slate-800 relative flex items-center justify-center m-4 rounded-2xl overflow-hidden shadow-inner">
                                    {callActive ? (
                                        <>
                                            <div className="text-center text-white">
                                                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                                                    <span className="text-slate-200 font-bold text-2xl">
                                                        {pt.avatar}
                                                    </span>
                                                </div>
                                                <p className="font-semibold text-lg">{pt.name}</p>
                                                <p className="text-green-400 text-sm mt-1 flex items-center gap-1 justify-center font-medium">
                                                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                                                    Live · 01:23
                                                </p>
                                            </div>
                                            <div className="absolute bottom-4 right-4 w-32 h-20 bg-slate-700/80 backdrop-blur-sm rounded-xl border border-slate-600 flex items-center justify-center shadow-lg overflow-hidden">
                                                {doctorData?.profilePic ? (
                                                    <img
                                                        src={doctorData.profilePic}
                                                        className="w-full h-full object-cover"
                                                        alt=""
                                                    />
                                                ) : (
                                                    <span className="text-slate-200 font-bold text-lg">
                                                        {doctorData?.name?.[0]}
                                                    </span>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center text-white">
                                            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 ring-4 ring-slate-800/50">
                                                <Icon
                                                    path={ic.user}
                                                    size={36}
                                                    className="text-slate-500"
                                                />
                                            </div>
                                            <p className="text-lg font-semibold text-slate-200">
                                                Patient Camera
                                            </p>
                                            <p className="text-slate-400 text-sm mt-1">
                                                Waiting for patient to connect…
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="px-4 pb-3 flex items-center justify-center gap-3">
                                    {[
                                        [ic.mic, "Mute", "slate"],
                                        [ic.video, "Camera", "slate"],
                                        [ic.endcall, "End", "red"],
                                    ].map(([icon, label, c]) => (
                                        <button
                                            key={label}
                                            onClick={() => {
                                                if (label === "End") setCallActive(false);
                                            }}
                                            className={`flex flex-col items-center gap-1 w-14 h-14 rounded-2xl justify-center transition-all shadow-sm ${c === "red"
                                                ? "bg-red-500 text-white hover:bg-red-600"
                                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                                }`}
                                        >
                                            <Icon path={icon} size={17} />
                                            <span className="text-[10px] font-medium uppercase tracking-wider">
                                                {label}
                                            </span>
                                        </button>
                                    ))}
                                    {!callActive && (
                                        <button
                                            onClick={() => setCallActive(true)}
                                            className="flex flex-col items-center gap-1 w-14 h-14 rounded-2xl justify-center bg-green-600 text-white hover:bg-green-700 transition-all shadow-md ml-2"
                                        >
                                            <Icon path={ic.video} size={17} />
                                            <span className="text-[10px] font-medium uppercase tracking-wider">
                                                Start
                                            </span>
                                        </button>
                                    )}
                                </div>
                                <div className="border-t border-slate-100 dark:border-slate-800 px-4 pb-4 pt-4">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                                        Video Call History
                                    </p>
                                    <div className="space-y-2">
                                        {(comms[activePtId]?.calls || [])
                                            .filter((c) => c.type === "video")
                                            .map((c, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-xl px-3 py-2 transition-colors"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                                            <Icon
                                                                path={ic.video}
                                                                size={13}
                                                                className="text-green-600 dark:text-green-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                                Video Call
                                                            </p>
                                                            <p className="text-xs text-slate-400 dark:text-slate-500">
                                                                {c.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                                        {c.duration}
                                                    </span>
                                                </div>
                                            ))}
                                        {!(comms[activePtId]?.calls || []).some(
                                            (c) => c.type === "video"
                                        ) && (
                                                <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                                                    No video calls yet
                                                </p>
                                            )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
