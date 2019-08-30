"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cont_process_1 = require("./cont-process");
const host_fs_1 = require("./host-fs");
const log_1 = require("./log");
class HostMaster {
    showActivedHost(hostContent) {
        return __awaiter(this, void 0, void 0, function* () {
            let activeHostList = [];
            if (!hostContent) {
                hostContent = yield host_fs_1.default.readHost();
            }
            activeHostList = cont_process_1.default.getActivedHost(hostContent);
            if (activeHostList.length) {
                log_1.default.activedHosts(activeHostList);
            }
            else {
                log_1.default.noActviedHost();
            }
        });
    }
    activeHost(hostName) {
        return __awaiter(this, void 0, void 0, function* () {
            const hostContent = yield host_fs_1.default.readHost();
            const newHostContent = cont_process_1.default.activeHost(hostContent, hostName);
            yield host_fs_1.default.writeHost(newHostContent);
            log_1.default.activeHost(hostName);
            return newHostContent;
        });
    }
    listAllHosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const hostContent = yield host_fs_1.default.readHost();
            const hostNameList = cont_process_1.default.getAllHostName(hostContent);
            log_1.default.allHosts(hostNameList);
            return hostContent;
        });
    }
    closeHost(hostName) {
        return __awaiter(this, void 0, void 0, function* () {
            const hostContent = yield host_fs_1.default.readHost();
            const newHostContent = cont_process_1.default.closeHost(hostContent, hostName);
            log_1.default.closeHost(hostName);
            return newHostContent;
        });
    }
    closeAllHosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const hostContent = yield host_fs_1.default.readHost();
            const newHostContent = cont_process_1.default.closeAllHost(hostContent);
            yield host_fs_1.default.writeHost(newHostContent);
            log_1.default.closeAllHost();
            return newHostContent;
        });
    }
}
exports.default = new HostMaster();
//# sourceMappingURL=host-master.js.map