import React, { useContext } from "react";
import MEMES from "../../data/meme.json";
import Button from "../shared/Button";
import { useForm } from "react-hook-form";
import { SettingsContext } from "./Settings";

export const SettingsPanel = ({ children }) => {
    const { settingsProp, setSettingsProp } = useContext(SettingsContext);
    let positionSettings;
    switch (settingsProp.position) {
        case "left":
            positionSettings = `${
                settingsProp.showSetting ? "left-10" : "-left-96"
            } px-8 py-12 pt-16 top-1/2 w-96 h-[600px] -translate-y-1/2`;
            break;
        case "right":
            positionSettings = `${
                settingsProp.showSetting ? "right-10" : "-right-96"
            } px-8 py-12 pt-16 top-1/2 w-96 h-[600px] -translate-y-1/2`;
            break;
        case "down":
            positionSettings = `${
                settingsProp.showSetting ? "bottom-0" : "-bottom-60"
            } p-4 left-0 h-60 w-screen`;
            break;
        case "up":
            positionSettings = `${
                settingsProp.showSetting ? "top-0" : "-top-60"
            } p-4 left-0 h-60 w-screen`;
            break;
        default:
            positionSettings = `left-0 top-0 w-96 h-screen`;
    }

    return (
        <>
            <div
                className={`bg-slate-300 rounded-lg p-6 z-10 transition-all duration-[500ms] absolute flex flex-col gap-8 items-center ${positionSettings}`}>
                <Button
                    variant={"solid"}
                    customStyle={{
                        position: "absolute",
                        transform: "rotate(90deg) translateX(-50%)",
                        right: "-9.75rem",
                        top: "50%",
                        borderRadius: "0.5rem 0.5rem 0 0",
                    }}
                    onClick={() =>
                        setSettingsProp({ ...settingsProp, showSetting: true })
                    }>
                    Settings
                </Button>
                {children}
            </div>
        </>
    );
};

export const SettingsHeader = ({ title, subtitle }) => {
    const { settingsProp } = useContext(SettingsContext);
    let settingsPosition = settingsProp.position;

    let textAlign;
    switch (settingsPosition) {
        case "left":
            textAlign = "text-left";
            break;
        case "right":
            textAlign = "text-right";
            break;
        default:
            textAlign = "text-center";
    }

    return (
        <div>
            <div className={`w-full mb-4 ${textAlign}`}>
                <h3 className={`text-2xl`}>{title}</h3>
                <p className={`text-lg ${textAlign}`}>{subtitle}</p>
            </div>
        </div>
    );
};

export const SettingsBody = () => {
    const { memeIndex } = useContext(SettingsContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);

    const generateInputBox = () => {
        const inputArray = [];
        for (let i = 0; i < MEMES[memeIndex].box_count; i++) {
            inputArray.push(
                <div key={i}>
                    <label htmlFor={`text-${i}`}>{`Text ${i + 1}`}</label>
                    <input
                        className="block border border-gray-400 px-2 py-1"
                        id={`text-${i}`}
                        {...register(`text-${i}`)}
                    />
                </div>
            );
        }

        return inputArray;
    };
    return (
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            {generateInputBox()}
        </form>
    );
};

export const SettingsSubHeader = ({ primaryButton }) => {
    const { settingsProp, setMemeIndex, memeIndex } =
        useContext(SettingsContext);
    let settingsPosition = settingsProp.position;

    let flexSetting;
    switch (settingsPosition) {
        case "left":
        case "right":
            flexSetting = "flex-col";
            break;
        default:
            flexSetting = "flex-row";
    }

    return (
        <div className={`w-min flex gap-2 ${flexSetting}`}>
            <Button
                variant={"outline"}
                onClick={() => memeIndexGenerator(setMemeIndex, memeIndex)}>
                {primaryButton}
            </Button>
        </div>
    );
};

const memeIndexGenerator = (setMemeIndex, memeIndex) => {
    setMemeIndex(Math.floor(Math.random() * 100));
};