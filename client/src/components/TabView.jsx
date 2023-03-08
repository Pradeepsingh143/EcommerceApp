import React, { useState, lazy, useEffect } from "react";
import { Paragraph } from "../utils/styledComponents/components";
const ReactQuill = lazy(() => import("react-quill"));

export const TabViewSkeleton = ({ tabs }) => {
  return (
    <div className="tabView">
      <div className="tabName">
        <div>
          <div className="tabs flex overflow-x-auto no-scrollbar gap-2">
            {tabs.map((tab, index) => (
              <div className="tabs animate-pulse" key={index}>
                <div className="w-20 h-8 md:w-32 md:h-10 bg-gray-300 rounded-t-md dark:bg-gray-700 flex justify-center items-center">
                  <p className="w-16 h-2 md:w-24 md:h-3 bg-gray-200 rounded dark:bg-gray-700"></p>
                </div>
              </div>
            ))}
          </div>

          <div className="content border md:border-2 border-primary rounded-b p-2 animate-pulse">
            <div className="w-full min-h-[400px]">
              <div class="flex items-center justify-center w-full h-56 bg-gray-300 rounded sm:w-80 dark:bg-gray-700">
                <svg
                  class="w-12 h-12 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>

              <p className="w-2/4 h-5 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
              <p className="w-3/4 h-4 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
              <p className="w-full h-2 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
              <p className="w-full h-2 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
              <p className="w-full h-2 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
              <p className="w-full h-2 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabView = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0); // intializing state for active tab index
  const [isCssLoaded, setIsCssLoaded] = useState(false);

  useEffect(() => {
    const importCss = async () => {
      await import("react-quill/dist/quill.snow.css");
      setIsCssLoaded(true);
    };
    importCss();
  }, []);

  const activeTab = (index) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="tabView">
      <div className="tabName">
        {Object.keys(tabs).length === 0 ? (
          <div>
            {" "}
            <Paragraph>
              No Value Passed, Please add Title, tabs=object of array then
              inside array name and content obj
            </Paragraph>{" "}
          </div>
        ) : (
          <div>
            <div className="tabs flex overflow-x-auto no-scrollbar gap-1 ">
              {tabs.map((tab, index) => (
                <label
                  key={index}
                  className={
                    index === activeTabIndex
                      ? "cursor-pointer p-2 px-4 text-primary bg-white mr-1 rounded-t text-xs border-x border-t border-primary border-solid md:px-6 md:border-x-2 md:border-t-2 md:text-base"
                      : "cursor-pointer p-2 px-4 text-white bg-primary mr-1 rounded-t text-xs border-x border-t border-primary border-solid md:px-6 md:border-x-2 md:border-t-2 md:text-base"
                  }
                  onClick={() => activeTab(index)}
                >
                  {tab.name}
                </label>
              ))}
            </div>
            <div className="content border md:border-2 border-primary rounded-b">
              {isCssLoaded && (
                <ReactQuill
                  value={tabs[activeTabIndex].content}
                  readOnly={true}
                  theme="snow"
                  modules={{ toolbar: false }}
                  style={{ height: "auto", width: "auto" }}
                  className="quill-content rounded-b"
                  dangerouslySetInnerHTML={{
                    __html: tabs[activeTabIndex].content,
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabView;
