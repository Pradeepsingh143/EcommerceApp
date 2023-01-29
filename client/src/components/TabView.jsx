import React, { useState } from "react";
import {Paragraph } from "../utils/styledComponents/components";

const TabView = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0); // intializing state for active tab index

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
            <div className="content border md:border-2 border-primary p-4 rounded-b">
              {tabs[activeTabIndex].content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabView;
