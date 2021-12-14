import fs from 'fs';
import path from 'path';
import * as Eta from 'eta';

let templatesDir = null;

export function loadAllTemplateFiles(templateName: string) {
  if (!templateName) {
    throw new Error(`No template name was provided`);
  }

  templatesDir = fs.existsSync(templateName)
    ? templateName
    : path.join(__dirname, '..', '..', 'templates', templateName);

  if (!fs.existsSync(templatesDir)) {
    throw new Error(
      `Could not found directory with the template (we tried ${templatesDir}). Template name is correct?`,
    );
  }
  const templates = fs.readdirSync(templatesDir);

  templates.forEach((t) => {
    const filePath = path.join(templatesDir, t);
    const file = fs.readFileSync(filePath, 'utf8');
    Eta.templates.define(t, Eta.compile(file));
  });
}

export function renderFile(templateFile: string, data: object = {}) {
  const filePath = path.join(templatesDir, templateFile);
  return Eta.renderFile(filePath, data);
}
