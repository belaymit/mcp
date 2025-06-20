# Implementation for NEX-456: MCP Server for Task API
import json
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Task:
    """Task model for the Task Management API"""
    id: str
    title: str
    description: str
    status: str
    assignee: Optional[str]
    created_at: datetime
    updated_at: datetime
    priority: str = "medium"
    labels: List[str] = None

class TaskMCPServer:
    """MCP Server wrapper for Task Management API"""
    
    def __init__(self):
        self.tasks: Dict[str, Task] = {}
        self.methods = {
            'get_tasks': self.get_tasks,
            'create_task': self.create_task,
            'update_task': self.update_task,
            'delete_task': self.delete_task,
            'get_task_by_id': self.get_task_by_id
        }
    
    async def get_methods(self) -> Dict[str, Any]:
        """Return available MCP methods"""
        return {
            'methods': list(self.methods.keys()),
            'description': 'Task Management API MCP Server',
            'version': '1.0.0'
        }
    
    async def invoke_method(self, method_name: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """Invoke a specific method with parameters"""
        if method_name not in self.methods:
            raise ValueError(f"Method {method_name} not found")
        
        try:
            result = await self.methods[method_name](params)
            return {
                'success': True,
                'data': result,
                'timestamp': datetime.now().isoformat()
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            }
    
    async def get_tasks(self, params: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Get all tasks or filter by status"""
        status_filter = params.get('status')
        tasks = list(self.tasks.values())
        
        if status_filter:
            tasks = [task for task in tasks if task.status == status_filter]
        
        return [self._task_to_dict(task) for task in tasks]
    
    async def create_task(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new task"""
        task_id = f"task_{len(self.tasks) + 1}"
        task = Task(
            id=task_id,
            title=params['title'],
            description=params.get('description', ''),
            status=params.get('status', 'todo'),
            assignee=params.get('assignee'),
            created_at=datetime.now(),
            updated_at=datetime.now(),
            priority=params.get('priority', 'medium'),
            labels=params.get('labels', [])
        )
        
        self.tasks[task_id] = task
        return self._task_to_dict(task)
    
    def _task_to_dict(self, task: Task) -> Dict[str, Any]:
        """Convert Task object to dictionary"""
        return {
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'status': task.status,
            'assignee': task.assignee,
            'created_at': task.created_at.isoformat(),
            'updated_at': task.updated_at.isoformat(),
            'priority': task.priority,
            'labels': task.labels or []
        } 