import { createClient } from "redis";
import { copyFinalDist, downloadS3Folder } from "./utils/S3Transfer";
import { buildProject } from "./utils/BuildProject";

const subscriber = createClient();
await subscriber.connect();

const publisher = createClient();
await publisher.connect();

async function main() {
    while (1) {
        const res = await subscriber.brPop('build-queue', 0);
        const id = res?.element as string;

        await downloadS3Folder(`outputs/${id}`);
        await buildProject(id);
        copyFinalDist(id);
        await publisher.hSet("status", id, "deployed");
    }
}

main();
