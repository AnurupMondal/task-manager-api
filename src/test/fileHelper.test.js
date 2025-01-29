const fs = require("fs");
const path = require("path");
const fileHelper = require("../utils/fileHelper");

jest.mock("fs"); // Mock fs module to avoid actual file operations

const TASKS_FILE = path.join(__dirname, "../../tasks.json");

describe("File Helper Utility", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should read tasks from file and return parsed JSON", () => {
    const mockData = JSON.stringify([{ id: 1, title: "Test Task" }]);
    fs.readFileSync.mockReturnValue(mockData);

    const tasks = fileHelper.readTasksFromFile();

    expect(tasks).toEqual([{ id: 1, title: "Test Task" }]);
    expect(fs.readFileSync).toHaveBeenCalledWith(TASKS_FILE);
  });

  test("Should return an empty array if file read fails", () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error("File not found");
    });

    const tasks = fileHelper.readTasksFromFile();

    expect(tasks).toEqual([]);
    expect(fs.readFileSync).toHaveBeenCalledWith(TASKS_FILE);
  });

  test("Should write tasks to file correctly", () => {
    const tasks = [{ id: 1, title: "Test Task" }];

    fileHelper.writeTasksToFile(tasks);

    expect(fs.writeFileSync).toHaveBeenCalledWith(TASKS_FILE, JSON.stringify(tasks, null, 2));
  });
});