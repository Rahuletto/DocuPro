"use client";

import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useTheme } from "@/provider/ThemeProvider";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";
import ThemeToggle from "./ThemeToggle";

interface PdfViewerProps {
  url: string;
  title?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url, title }) => {
  const toolbarPluginInstance = toolbarPlugin({
    getFilePlugin: {
      fileNameGenerator: (file) => `${title}.pdf`,
    },
  });
  const { Toolbar } = toolbarPluginInstance;
  const { isDark } = useTheme();
  return (
    <div style={{ height: "100vh" }}>
      <ThemeToggle absolute />
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className="bottom-[32px] left-1/2 p-1 absolute -translate-x-1/2 z-20">
          <Toolbar>
            {(props: ToolbarSlot) => {
              const {
                CurrentPageInput,
                Download,
                EnterFullScreen,
                GoToNextPage,
                GoToPreviousPage,
                NumberOfPages,
                ZoomIn,
                ZoomOut,
              } = props;
              return (
                <div className="flex items-center justify-center transition duration-200 bg-light-background-normal dark:bg-dark-background-light text-black border-light-input rounded-md">
                  <div className="px-0.5 pdf-btn ml-1">
                    <ZoomOut />
                  </div>
                  <div className="px-0.5 pdf-btn">
                    <ZoomIn />
                  </div>
                  <div className="px-0.5 ml-auto pdf-btn">
                    <GoToPreviousPage />
                  </div>
                  <div className="px-0.5 w-10 pdf-input">
                    <CurrentPageInput />
                  </div>
                  <div className="px-0.5 w-10 opacity-60 transition duration-200 dark:text-dark-color text-light-color">
                    / <NumberOfPages />
                  </div>
                  <div className="px-0.5 pdf-btn">
                    <GoToNextPage />
                  </div>
                  <div className="px-0.5 ml-auto pdf-btn">
                    <EnterFullScreen />
                  </div>
                  <div className="px-0.5 pdf-btn mr-1">
                    <Download />
                  </div>
                </div>
              );
            }}
          </Toolbar>
        </div>
        <Viewer
          fileUrl={url}
          plugins={[toolbarPluginInstance]}
          theme={isDark ? "dark" : "light"}
        />
      </Worker>
    </div>
  );
};

export default PdfViewer;
