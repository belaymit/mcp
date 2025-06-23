# Fix for NEX-456: MCP Server Implementation for Task API
import asyncio
from typing import Dict, Any, List

class TaskMCPServer:
    """MCP Server wrapper for Task Management API"""
    
    def __init__(self):
        self.tasks_db = {}
        
    async def get_methods(self) -> List[str]:
        """Return available MCP methods"""
        return [
            "get_task",
            "list_tasks", 
            "create_task",
            "update_task",
            "delete_task"
        ]
    
    async def invoke_method(self, method: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle MCP method invocations"""
        if method == "get_task":
            return await self._get_task(params)
        elif method == "list_tasks":
            return await self._list_tasks(params)
        elif method == "create_task":
            return await self._create_task(params)
        elif method == "update_task":
            return await self._update_task(params)
        elif method == "delete_task":
            return await self._delete_task(params)
        else:
            raise ValueError(f"Unknown method: {method}")
    
    async def _get_task(self, params: Dict[str, Any]) -> Dict[str, Any]:
        task_id = params.get("task_id")
        return {"task": self.tasks_db.get(task_id, {})}
    
    async def _list_tasks(self, params: Dict[str, Any]) -> Dict[str, Any]:
        return {"tasks": list(self.tasks_db.values())}
    
    async def _create_task(self, params: Dict[str, Any]) -> Dict[str, Any]:
        task_id = f"task_{len(self.tasks_db) + 1}"
        task = {"id": task_id, **params}
        self.tasks_db[task_id] = task
        return {"created_task": task}
    
    async def _update_task(self, params: Dict[str, Any]) -> Dict[str, Any]:
        task_id = params.get("task_id")
        if task_id in self.tasks_db:
            self.tasks_db[task_id].update(params)
            return {"updated_task": self.tasks_db[task_id]}
        return {"error": "Task not found"}
    
    async def _delete_task(self, params: Dict[str, Any]) -> Dict[str, Any]:
        task_id = params.get("task_id")
        if task_id in self.tasks_db:
            deleted_task = self.tasks_db.pop(task_id)
            return {"deleted_task": deleted_task}
        return {"error": "Task not found"}

# Example usage
if __name__ == "__main__":
    server = TaskMCPServer()
    # Run the server (pseudo-code for illustration)
    # server.run(host="localhost", port=8001) 