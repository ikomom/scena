
import * as React from "react";
import Timeline from "react-scenejs-timeline";
import Scene from "scenejs";
import { ref } from "./react-scenejs-editor/utils";
import { zoomIn } from "@scenejs/effects";
import { poly } from "shape-svg";
import "./App.css";
import Editor from "./react-scenejs-editor/Editor";

export default class App extends React.Component<{}> {
    private scene: Scene = new Scene();
    private timeline!: Timeline;
    private editor!: Editor;
    public render() {
        return (
            <div>
                <div className="clapper">
                    <div className="clapper-container">
                        <div className="clapper-body">
                            <div className="top">
                                <div className="stick stick1">
                                    <div className="rect"></div>
                                    <div className="rect"></div>
                                    <div className="rect"></div>
                                    <div className="rect"></div>
                                    <div className="rect"></div>
                                    <div className="rect"></div>
                                </div>
                                <div className="stick stick2">
                                    <div className="rect"></div>
                                    <div className="rect"></div>
                                    <div className="rect"></div>
                                    <div className="rect"></div>
                                    <div className="rect"></div>
                                    <div className="rect"></div>
                                </div>
                            </div>
                            <div className="bottom"></div>
                        </div>
                        <div className="circle"></div>
                        <div className="play"></div>
                    </div>
                </div>
                <Editor
                    ref={ref(this, "editor")}
                    scene={this.scene}
                />
            </div>);
    }
    public componentDidMount() {
        (window as any).app = this;

        document.querySelector(".play")!.appendChild(poly({
            strokeWidth: 10,
            left: 5,
            top: 5,
            right: 5, bottom: 5, width: 50, rotate: 90, fill: "#333", stroke: "#333",
        }));
        this.scene.load({
            ".clapper": {
                2: "transform: translate(-50%, -50%) rotate(0deg)",
                2.5: {
                    transform: "rotate(-15deg)",
                },
                3: {
                    transform: "rotate(0deg)",
                },
                3.5: {
                    transform: "rotate(-10deg)",
                },
            },
            ".clapper-container": {
                0: zoomIn({ duration: 1 }),
            },
            ".circle": {
                0.3: zoomIn({ duration: 1 }),
            },
            ".play": {
                0: {
                    transform: "translate(-50%, -50%)",
                },
                0.6: zoomIn({ duration: 1 }),
            },
            ".top .stick1": {
                2: {
                    transform: {
                        rotate: "0deg",
                    },
                },
                2.5: {
                    transform: {
                        rotate: "-20deg",
                    },
                },
                3: {
                    transform: {
                        rotate: "0deg",
                    },
                },
                3.5: {
                    transform: {
                        rotate: "-10deg",
                    },
                },
            },
            ".stick1 .rect": (i: number) => ({
                0: {
                    transform: {
                        scale: 0,
                        skew: "15deg",
                    },
                },
                0.7: {
                    transform: {
                        scale: 1,
                    },
                },
                options: {
                    delay: 0.6 + i * 0.1,
                },
            }),
            ".stick2 .rect": (i: number) => ({
                0: {
                    transform: {
                        scale: 0,
                        skew: "-15deg",
                    },
                },
                0.7: {
                    transform: {
                        scale: 1,
                    },
                },
                options: {
                    delay: 0.8 + i * 0.1,
                },
            }),
        }, {
                easing: "ease-in-out",
                iterationCount: "infinite",
                selector: true,
            });
        this.editor.update(true);
    }
}
