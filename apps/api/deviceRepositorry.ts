import { Device, deviceSchema } from "shared/event.ts";

export class DeviceRepository {
  private constructor(private data: Device[]) {}

  static async Build(dataPath: string): Promise<DeviceRepository> {
    const data = await DeviceRepository.loadData(dataPath);
    const instance = new DeviceRepository(data);
    return instance;
  }

  private static async loadData(dataPath: string): Promise<Device[]> {
    const data: Device[] = [];
    try {
      const dataText = await Deno.readTextFile(dataPath);
      const jsonData = JSON.parse(dataText);

      if (Array.isArray(jsonData)) {
        const parsedData = jsonData.map((item) => deviceSchema.parse(item));
        data.push(...parsedData);
        console.log(`Loaded ${data.length} devices from ${dataPath}`);
      } else {
        throw new Error("Data is not an array");
      }
    } catch (error) {
      console.error(`Error loading data from ${dataPath}:`, error);
    }
    return data;
  }

  private fetch(page: number, pageSize: number = 25): Device[] {
    const start = Math.max(0, (page - 1) * pageSize);
    return this.data.slice(start, start + pageSize);
  }
}
