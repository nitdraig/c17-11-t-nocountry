import { matchKey } from '@Constants/regex';
import { AnyObject } from '@Interfaces/global.interface';
import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class GetHtmlService {
  /**
   * @description Method that returns a certain html template as a string in addition to replacing values ​​in the template
   * @param html The type of html template to use
   * @param lang Template language in two-letter ISO 639-1 (example: english -> en | español -> es)
   * @param data Object with the properties to replace in the template
   * @returns html as string
   */
  async get(
    html: 'reset-password',
    lang: string,
    data?: AnyObject,
  ): Promise<string> {
    try {
      const path = this.resolvePath(`${html}_${lang}.html`);
      const htmlContent = await readFile(path, 'utf8');

      if (data === undefined) return htmlContent;

      return this.changeKey(htmlContent, data);
    } catch (error) {
      const path = this.resolvePath(`${html}_es.html`);
      const htmlContent = await readFile(path, 'utf8');

      if (data === undefined) return htmlContent;
      return this.changeKey(htmlContent, data);
    }
  }

  private changeKey(html: string, data: AnyObject): string {
    Object.keys(data).forEach((key) => {
      html = html.replace(matchKey(key), data[key]);
    });

    return html;
  }

  private resolvePath(filename: string): string {
    return join(__dirname, `../../../assets/static/${filename}`);
  }
}
